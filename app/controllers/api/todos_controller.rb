class Api::TodosController < ApplicationController
  def index
    todos = Todo.all.includes(:tags).order(created_at: :asc)
    todos_with_tags = todos.to_a.map { |todo| merge_tags(todo) }
    render json: todos_with_tags
  end

  def create
   new_todo = Todo.new(todo_params)
    if new_todo.save
      add_tags(params[:tags], new_todo)
      render json: new_todo
    else
      render json: new_todo.errors, status: :unprocessable_entity
    end
  end

  def show
    if todo
      render json: merge_tags(todo)
    else
      render json: todo.errors, status: :unprocessable_entity
    end
  end

  def update
    if todo.update(todo_params)
      if params.key?(:tags)
        clear_tags(todo)
        add_tags(params[:tags], todo)
      end
      render json: todo
    else
      render json: todo.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if todo
      clear_tags(todo)
      todo.destroy
      render json: { message: 'To-do deleted' }
    else
      render json: { message: 'To-do not found in database' }, status: :unprocessable_entity
    end
  end

  private

  def todo_params
    params.require('todo').permit(:name, :details, :category, :is_done)
  end

  def todo
    @todo ||= Todo.find(params[:id])
  end

  # Returns a hash of todo with an additional 'tags' key with the todo's tags sorted alphabetically
  def merge_tags(todo)
    tag_names = todo.tags.to_a.map { |tag| tag.name }
    todo.as_json.merge({'tags' => tag_names.sort!})
  end

  # Increments the counts for each tag or creates them if they are not in the database yet
  # Adds the tags to todo
  def add_tags(tag_names, todo)
    # Only continue if tag_names exists and is formatted correctly as an array
    return unless tag_names.kind_of?(Array)
    
    tags = []
    tag_names.map(&:downcase).uniq.each do |tag_name|
      tag = Tag.find_by(name: tag_name)
      if tag
        tag.update(count: tag.count + 1)
        tags.append(tag)
      else
        new_tag = Tag.new({ name: tag_name, count: 1 })
        if new_tag.save
          tags.append(new_tag)
        end
      end
    end

    todo.tags << tags
  end

  # Clears all tags from todo and also destroys them if no other todo uses them
  def clear_tags(todo)
    todo.tags.each do |tag|
      count = tag.count
      if count == 1
        tag.destroy
      else
        tag.update(count: count - 1)
      end
    end
    todo.tags.clear
  end
end

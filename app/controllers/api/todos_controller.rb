class Api::TodosController < ApplicationController
  def index
    todos = Todo.all.order(created_at: :asc)
    render json: todos
  end

  def create
   new_todo = Todo.new(todo_params)
    if new_todo.save
      render json: new_todo
    else
      render json: new_todo.errors, status: :unprocessable_entity
    end
  end

  def show
    if todo
      render json: todo
    else
      render json: todo.errors, status: :unprocessable_entity
    end
  end

  def update
    if todo.update(todo_params)
      render json: todo
    else
      render json: todo.errors, status: :unprocessable_entity
    end
  end

  def destroy
    todo&.destroy
    render json: {message: 'To-do deleted'}
  end

  private

  def todo_params
    params.require('todo').permit(:name, :details, :category)
  end

  def todo
    @todo ||= Todo.find(params[:id])
  end
end

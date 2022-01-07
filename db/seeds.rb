# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
todo1 = Todo.create(
  name: 'To-do 1',
  details: 'To-do 1 details',
  category: 'To-do 1 category'
)
todo2 = Todo.create(
  name: 'To-do 2',
  details: 'To-do 2 details'
)
todo3 = Todo.create(
  name: 'To-do 3',
  category: 'To-do 3 category'
)
todo4 = Todo.create(
  name: 'To-do 4'
)
tag1 = Tag.create(
  name: 'tag_1',
  count: 3
)
tag2 = Tag.create(
  name: 'tag_2',
  count: 1
)
todo1.tags << tag1
todo3.tags << [tag1, tag2]
todo4.tags << tag1

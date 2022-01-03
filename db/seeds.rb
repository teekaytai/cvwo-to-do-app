# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
Todo.create(
  name: 'To-do 1',
  details: 'To-do 1 details',
  category: 'To-do 1 category'
)
Todo.create(
  name: 'To-do 2',
  details: 'To-do 2 details'
)
Todo.create(
  name: 'To-do 3',
  category: 'To-do 3 category'
)
Todo.create(
  name: 'To-do 4'
)

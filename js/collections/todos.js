var app = app || {};

// Todo Collection
// ---------------

// Backed by HTML5 localStorage instead of a server
var TodoList = Backbone.Collection.extend({
  
  // Reference to this collection's model
  model: app.Todo,

  // Save all the todo items under the "todos-backbone" namespace.
  localStorage: new Backbone.LocalStorage('todos-backbone'),

  // Filter down the list of all todo items that are finished.
  completed: function() {
    return this.filter(function( todo ) {
      return todo.get('completed');
    });
  },

  // Filter down the list to only todo items that are still not finished
  remaining: function() {
    // apply allows us to define the context of this within our function scope
    return this.without.apply( this, this.completed() );
  },

  // Keep the Todos in sequential order, despite being saved by unordered
  // GUID in the database. This generate the next order number for new items.
  nextOrder: function() {
    if ( !this.length ) {
      return 1;
    }
    return this.last().get('order') + 1;
  },

  // Sort todos by original insertion order
  comparator: function( todo ) {
    return todo.get('order');
  }

});

app.Todos = new TodoList();

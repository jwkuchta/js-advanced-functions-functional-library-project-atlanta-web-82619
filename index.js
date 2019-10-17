const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, cb) {
      let newCollection = (collection instanceof Array) ? collection.slice() : Object.values(collection)
      for (let i=0; i < newCollection.length; i++) {
        cb(newCollection[i])
      }
      return collection
    },

    map: function(collection, cb) {
      let newCollection = []
      if (!(collection instanceof Array)) collection = Object.values(collection)
      for (let i=0; i < collection.length; i++) {
        newCollection.push(cb(collection[i]))
      }
      return newCollection
    },
  
    reduce: function(collection, cb, memo) {
      collection = collection.slice(0)
      
      if (!memo) memo = collection[0], collection = collection.slice(1)
      
			for (let i = 0; i < collection.length; i++) {
				memo = cb(memo, collection[i], collection)
			}
			return memo;
		},

    find: function(collection, predicate) {
      if (!(collection instanceof Array)) collection = Object.values(collection)

      for (let i = 0; i < collection.length; i++)
        if (predicate(collection[i])) return collection[i]
      return undefined
    },
    filter: function(collection, predicate) {
      if (!(collection instanceof Array)) collection = Object.values(collection)
      const newCollection = []

      for (let i = 0; i < collection.length; i++)
        if (predicate(collection[i])) newCollection.push(collection[i])

      return newCollection
    },
    size: function(collection) {
      return (collection instanceof Array) ? collection.length : Object.values(collection).length
    },
    first: function(collection, n) {
      return n ? collection.slice(0, n) : collection[0]
    },
    last: function(collection, n) {
      return n ? collection.slice(collection.length-n, collection.length) : collection[collection.length-1]
    },
    compact: function(collection) {
      let good = []
      for (let i = 0; i < collection.length; i++) {
        if (collection[i]) good.push(collection[i])
      }
      return good;
    },
    sortBy: function(collection, cb) {
      const newCollection = [...collection];
      return newCollection.sort((a,b) => cb(a) - cb(b))
    },
    unpack: function(receiver, collection) {
      for (let el of collection)
        receiver.push(el)
    },
    //had no idea how to do this one and copied it...:
    flatten: function(collection, shallow, newArr=[]) {
      if (!Array.isArray(collection)) return newArr.push(collection)
      if (shallow) {
        for (let val of collection)
          Array.isArray(val) ? this.unpack(newArr, val) : newArr.push(val)
      } else {
        for (let val of collection) {
          this.flatten(val, false, newArr)
        }
      }
      return newArr
    },
    uniqSorted: function(collection, cb) {
      const sorted = [collection[0]]
      for (let i = 1; i < collection.length; i++) {
        if (sorted[i-1] !== collection[i])
          sorted.push(collection[i])
      }
      return sorted
    },
    uniq: function(collection, sorted, cb) {
      if (sorted) {
        return fi.uniqSorted(collection, cb)
      } else if (!cb) {
        return Array.from(new Set(collection))
      } else {
        const modifiedVals = new Set()
        const uniqVals = new Set()
        for (let val of collection) {
          const moddedVal = cb(val)
          if (!modifiedVals.has(moddedVal)) {
            modifiedVals.add(moddedVal)
            uniqVals.add(val)
          }
        }
        return Array.from(uniqVals)
      }
    },
    keys: function(obj) {
      const keys = []
      for (let key in obj){
        keys.push(key)
      }
      return keys
    },
    values: function(obj) {
      const values = []
      for (let key in obj){
        values.push(obj[key])
      }
      return values
    },
    functions: function(obj) {
      const functionNames = []

      for (let key in obj) {
        if (typeof obj[key] === "function"){
          functionNames.push(key)
        }
      }
      return functionNames.sort()
    },
  }
})()

fi.libraryMethod()

// symbolic type system

// generic base object: constructor from <tag:value>
function MObject(V) {
	// object class/type in simple string form
	this.type	= this.constructor.name.toLowerCase()
	// single value
	this.value	= V	
}


function MStack(V)		{ MObject.call(this,V) }

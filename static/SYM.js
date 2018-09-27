// symbolic type system

// generic base object: constructor from <tag:value>
function MObject(V) {
	
	// object class/type in simple string form
	this.type	= this.constructor.name.toLowerCase().substring(1)
	// single value
	this.value	= V
	
	// attr{}ibutes
	this.attr	= {}
	// assign attribute
	this.set	= function(key,obj) { this.attr[key] = obj; return this }
	// get attribute
	this.get	= function(key) { return this.attr[key] }
	// get list of attributes
	this.keys	= function() { return Object.keys(this.attr) }
	
	// nest[]ed objects
	this.nest	= []
	// push object to nested as a stack
	this.push	= function(obj) { this.nest.push(obj) ; return this }
//	// pop object from stack
//	this.pop	= function() { return this.nest.pop() }
	// clean stack
	this.dropall = function() { this.nest = [] }
	
	// execute object in context = stack
	this.exec	 = function(context) { context.push(this) }
	// compile object to context = vector
	this.compile = function(context) { context.push(this) }	
	
	// short object dump in <T:V> form
	this.head	= function() { return "<"+this.type+":"+this.str()+">" }
	// string representation of value only
	this.str	= function() { return this.value.toString() }
	// dump object in full tree form
	this.dump	= function(depth=0,prefix='',suffix='') {
		var T = this.pad(depth) + this.head(prefix) + suffix
		for (i in this.attr) T += this.attr[i].dump(depth+1,prefix=i)
		for (j in this.nest) T += this.nest[j].dump(depth+1)
		return T
	}
	// left pad for tree form
	this.pad	= function(N) { return '\n' + '    '.repeat(N) }
	
}

function MPrimitive(V)	{ MObject.call(this,V) }

function MSym(V)		{ MPrimitive.call(this,V)
	this.exec = function() {
		// lookup in vocabulary
		var body = W.get(this.value)
		// execute found body
		if (body) body.exec(S)
		// or fallback: throw error
		else      throw new MError('unknown',this)
	
	}
}

function MStr(V)		{ MPrimitive.call(this,V) }

function MNum(V)		{ MPrimitive.call(this,V)
					  	this.value = parseFloat(V) }
function MInt(V)		{ MPrimitive.call(this,V)
						this.value = parseInt(V) }

function MHex(V)		{ MPrimitive.call(this,V)
					  	this.value	= parseInt(V.substring(2),0x10)
					  	this.str	= function() {
							return '0x'+this.value.toString(0x10).toUpperCase() }
						}

function MBin(V)		{ MPrimitive.call(this,V)
					  	this.value	= parseInt(V.substring(2),0x02)
						this.str	= function() {
							return '0b'+this.value.toString(0x02) }
						}

function MContainer(V)	{ MObject.call(this,V) }

function MStack(V)		{ MContainer.call(this,V) }

function MMap(V)		{ MContainer.call(this,V)
							this.push = function(obj) { this.set(obj.value,obj) }
						}

function MVector(V)		{ MContainer.call(this,V) }

//active objects has executable semantics
function MActive(V)		{ MObject.call(this,V) }

// JS function wrapper as virtual machine command
function MCmd(V,F)		{ MActive.call(this,V) ; this.exec = F
							this.superdump = this.dump
							this.dump = function(depth,prefix='',suffix='') {
								return this.superdump(depth,prefix,suffix=' '+this.exec.toString()) }
						}

function MDef(V)		{ MActive.call(this,V) }

// Error object
function MError(V,obj)	{ MPrimitive.call(this,V) ; this.push(obj) }

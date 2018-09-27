
S = new MStack('DATA')

window.onload = function() {
	go.onclick = process
	document.body.onkeydown = keydown
	init_vocabulary()
	update()
}

function keydown(event) {
	if (event.ctrlKey & event.key == 'Enter') process()
}

function process() {
	err('')
	try {
	// create parser
	var parser = peg.generate(meta.value)
	// and run it vith #pad value
	parser.parse(pad.value)
	} catch (e) {
		try       { err(e.dump())          }
		catch (x) { err(JSON.stringify(e)) }
	}
	// update web interface
	finally {
		update()
	}
}

function out(some) { log.innerText  += some }
function err(some) { error.innerText = some }

function flat(vector) { return [].concat.apply([],vector) }
function join(token)  { return flat(token).join('') }

function update() {
	stack.innerText = S.dump()
	words.innerText = W.dump()
}

COMPILE = false

function doit(obj) {
	if (COMPILE) obj.compile(COMPILE)
	else		 obj.exec(S)
}

W = new MMap('FORTH')

function init_vocabulary() {
	W.push(new MCmd('.',function(context) { context.dropall()   } ))
	W.push(new MCmd('?',function(context) { out(context.dump()) } ))
}

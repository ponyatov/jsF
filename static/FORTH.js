window.onload = function() {
	go.onclick = process
	document.body.onkeydown = keydown
}

function keydown(event) {
	if (event.ctrlKey & event.key == 'Enter') process()
}

function process() {
}

function process() {
	err('') ; S = []
	try {
	// create parser
	var parser = peg.generate(meta.value)
	// and run it vith #pad value
	parser.parse(pad.value)
	} catch (e) { err(JSON.stringify(e)) }
	// update web interface
	finally { update() }
}

function out(some) { log.innerText  += some }
function err(some) { error.innerText = some }

function flat(vector) { return [].concat.apply([],vector) }
function join(token)  { return flat(token).join('') }

S = Stack('DATA')

function update() { stack.innerText = S; }

function doit(wname) {
	S.push(wname)
}

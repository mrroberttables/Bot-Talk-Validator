function getCutout(elementNames) {
	var points = [];

	for(var i = 0; i < elementNames.length; i++) {
		let divOffsets = document.getElementById(elementNames[i]).getBoundingClientRect();

		points.push(`${divOffsets.left}px ${divOffsets.top}px`);
		points.push(`${divOffsets.right}px ${divOffsets.top}px`);
		points.push(`${divOffsets.right}px ${divOffsets.bottom}px`);
		points.push(`${divOffsets.left}px ${divOffsets.bottom}px`);
		points.push(`${divOffsets.left}px ${divOffsets.top}px`);
		points.push(`0 0`);
	}
	


	let hole = `polygon( evenodd, 
		0 0,
		100% 0,
		100% 100%,
		0 100%,
		0 0,
		${points.join(",")}
		`;

	let overlay = document.getElementById("overlay");
	overlay.style.clipPath = hole;
}

var currentPuzzle;
var currentTime;

function startTutorial() {
	clockStop(timer);
	currentPuzzle = game;
	currentTime = timer.getMilliseconds();
	timer.setTime(0);
	game = new BalancingAct(0);
	game.setPuzzle(0, 17, [[1,3,13],[2,7,8]], 2, 3, [1,2,3,7,8,13]);
	displayGame();
	updateClock();

	let overlay = document.getElementById("overlay");
	overlay.style.display = "block";

	getCutout(["poolDiv","groupsDiv"]);

	//Add first message box
	var pool = document.getElementById('poolDiv').getBoundingClientRect();
	var div1 = document.createElement("div");
	div1.innerHTML = "Divide the pool of numbers...";
	div1.classList.add("tutorialTextBox");
	div1.style.top = `${pool.bottom + 5}px`;
	div1.style.left = `${pool.left}px`;
	div1.style.width = `${pool.width}px`;
	overlay.appendChild(div1);

	//Add second messsage box
	var groups = document.getElementById('groupsDiv').getBoundingClientRect();
	var div2 = document.createElement("div");
	div2.innerHTML = "into equal groups.";
	div2.classList.add("tutorialTextBox");
	div2.style.top = `${groups.bottom + 5}px`;
	div2.style.left = `${groups.left}px`;
	div2.style.width = `${groups.width}px`;
	overlay.appendChild(div2);

	let div2Offsets = div2.getBoundingClientRect();

	//Add next button
	var next = document.createElement("button");
	next.innerHTML = "Next";
	next.classList.add("btn");
	next.style.position = "absolute";
	next.style.top = `${div2Offsets.bottom + 5}px`;
	next.style.left = `${div2Offsets.left}px`;
	next.addEventListener("click", tutorial2);

	overlay.appendChild(next);

}

function tutorial2() {
	getCutout(["targetDiv"]);
	overlay.innerHTML = "";

	//Add first message box
	var target = document.getElementById('targetDiv').getBoundingClientRect();
	var div1 = document.createElement("div");
	div1.innerHTML = "Each group must sum to the target.";
	div1.classList.add("tutorialTextBox");
	div1.style.top = `${target.bottom + 5}px`;
	div1.style.left = `${target.left}px`;
	div1.style.width = `${target.width}px`;
	overlay.appendChild(div1);

	let div1Offsets = div1.getBoundingClientRect();

	//Add next button
	var next = document.createElement("button");
	next.innerHTML = "Next";
	next.classList.add("btn");
	next.style.position = "absolute";
	next.style.top = `${div1Offsets.bottom + 5}px`;
	next.style.left = `${div1Offsets.left}px`;
	next.addEventListener("click", tutorial3);

	overlay.appendChild(next);
}

function tutorial3() {
	overlay.style.clipPath = "";
	overlay.innerHTML = "";

	//Add first message box
	var pool = document.getElementById('poolDiv').getBoundingClientRect();
	var div1 = document.createElement("div");
	div1.innerHTML = "Drag and drop a number into a group. <br><br>OR <br><br>Click a number to select it. Then click a group to move the number to that group. <br><br>You can move numbers back into the pool, and from group to group.";
	div1.classList.add("tutorialTextBox");
	div1.style.top = `${pool.bottom + 5}px`;
	div1.style.left = `${pool.left}px`;
	div1.style.width = `${pool.width}px`;
	overlay.appendChild(div1);

	let div1Offsets = div1.getBoundingClientRect();

	//Add next button
	var next = document.createElement("button");
	next.innerHTML = "Next";
	next.classList.add("btn");
	next.style.position = "absolute";
	next.style.top = `${div1Offsets.bottom + 5}px`;
	next.style.left = `${div1Offsets.left}px`;
	next.addEventListener("click", tutorialFinal);

	overlay.appendChild(next);
}

function tutorialFinal() {
	getCutout(["gameBody"]);
	overlay.innerHTML = "";

	//Complete Puzzle
	game.workingGroupsList = [[1,3,13],[2,7,8]];
	game.workingNumberPool = [];
	displayGame();

	//Add first message box
	var target = document.getElementById('gameBody').getBoundingClientRect();
	var div1 = document.createElement("div");
	div1.innerHTML = "A solved puzzle.";
	div1.classList.add("tutorialTextBox");
	div1.style.top = `${target.bottom + 5}px`;
	div1.style.left = `${target.left}px`;
	div1.style.width = `${target.width}px`;
	overlay.appendChild(div1);

	let div1Offsets = div1.getBoundingClientRect();

	//Add next button
	var next = document.createElement("button");
	next.innerHTML = "Close";
	next.classList.add("btn");
	next.style.position = "absolute";
	next.style.top = `${div1Offsets.bottom + 5}px`;
	next.style.left = `${div1Offsets.left}px`;
	next.addEventListener("click", closeTutorial);

	overlay.appendChild(next);
}

function closeTutorial() {
	overlay.innerHTML = "";
	game = currentPuzzle;
	timer.setMilliseconds(currentTime);
	updateClock();
	displayGame();

	overlay.style.display = "none";
	clockStart(timer);
}
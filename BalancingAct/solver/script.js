function solve() {
    let outputDiv = document.getElementById('resultDiv');

    let target = parseInt(document.getElementById('target').value);
    let groupSize = parseInt(document.getElementById('group').value);
    let groupCount = parseInt(document.getElementById('count').value);
    let poolText = document.getElementById('poolArea').value;
    let pool = poolText.split(',').map(Number);
    let calcGroupCount = pool.length / groupSize;
    let validSets = [];

    if(calcGroupCount !== groupCount) {
        outputDiv.innerHTML = "Number Pool not not equal to Group Size x Number of Groups";
        return;
    }
 
    //This gets all subsets of the specified size that sum to the target
    for (subset of subsets(pool, groupSize)) {
        let sum = 0;
        subset.forEach((number) => {sum += number;});
 
        if(sum == target) {
            validSets.push(subset);
        }
    }
 
    //Loop through all the subsets of the valid sets and see which ones partition the number pool, these should be valid solutions
    validSolutions = [];
    for (potentialSolution of subsets(validSets, groupCount)) {
        let potentialSet = new Set();
        potentialSolution.forEach((setElement) => {
            setElement.forEach((element) => {
                potentialSet.add(element);
            })
        })
        if(potentialSet.size === pool.length) {
            validSolutions.push(potentialSolution);
        }
    }
    
    outputDiv.innerHTML = "";
    validSolutions.forEach((subset) => {
        subset.forEach((array) => {
            outputDiv.innerHTML += `[${array}]<br>`;
        });
        outputDiv.innerHTML += "<br>";
    });
}
 
function* subsets(array, length, start = 0) {
    if (start >= array.length || length < 1) {
      yield new Array();
    } else {
      while (start <= array.length - length) {
        let first = array[start];
        for (subset of subsets(array, length - 1, start + 1)) {
          subset.push(first);
          yield subset;
        }
        ++start;
      }
    }
  }
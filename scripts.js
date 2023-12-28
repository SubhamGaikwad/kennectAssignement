let array = [];

function randomizeArray() {
  array = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
  renderArray();
}

function renderArray() {
  const container = document.getElementById("array-container");
  container.innerHTML = "";

  array.forEach((value) => {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${value}px`;
    container.appendChild(bar);
  });
}

function disableButtons() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => (button.disabled = true));
}

function enableButtons() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => (button.disabled = false));
}

function applyBubbleSort() {
  disableButtons();
  let i = 0;

  function bubbleSortStep() {
    if (i < array.length - 1) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }
      }
      renderArray();
      i++;
      setTimeout(bubbleSortStep, 100); // Adjust the delay as needed
    } else {
      enableButtons();
    }
  }

  bubbleSortStep();
}

function applyMergeSort() {
  disableButtons();

  function mergeSortHelper(arr, l, r) {
    if (l < r) {
      const m = Math.floor((l + r) / 2);
      mergeSortHelper(arr, l, m);
      mergeSortHelper(arr, m + 1, r);
      merge(arr, l, m, r);
    }
  }

  function mergeSortStep() {
    let tempArray = [...array];
    mergeSortHelper(tempArray, 0, tempArray.length - 1);
    array = tempArray;
    renderArray();
    enableButtons();
  }

  mergeSortStep();
}

function merge(arr, l, m, r) {
  const n1 = m - l + 1;
  const n2 = r - m;

  const L = new Array(n1);
  const R = new Array(n2);

  for (let i = 0; i < n1; i++) L[i] = arr[l + i];
  for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

  let i = 0;
  let j = 0;
  let k = l;

  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
  }

  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }

  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
  }
}

function applyShellSort() {
  disableButtons();
  const n = array.length;
  let gap = Math.floor(n / 2);

  function shellSortStep() {
    for (let i = gap; i < n; i += 1) {
      let temp = array[i];
      let j;
      for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
        array[j] = array[j - gap];
      }
      array[j] = temp;
    }

    if (gap > 1) {
      gap = Math.floor(gap / 2);
      setTimeout(shellSortStep, 100); // Adjust the delay as needed
    } else {
      renderArray();
      enableButtons();
    }
  }

  shellSortStep();
}

function applyQuickSort() {
  disableButtons();

  function quickSortHelper(arr, low, high) {
    if (low < high) {
      const pi = partition(arr, low, high);
      quickSortHelper(arr, low, pi - 1);
      quickSortHelper(arr, pi + 1, high);
    }
  }

  function quickSortStep() {
    let tempArray = [...array];
    quickSortHelper(tempArray, 0, tempArray.length - 1);
    array = tempArray;
    renderArray();
    enableButtons();
  }

  quickSortStep();
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      // swap arr[i] and arr[j]
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }

  // swap arr[i+1] and arr[high] (or pivot)
  let temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;

  return i + 1;
}

// Initial random array on page load
randomizeArray();

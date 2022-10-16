import { KeysSounds } from './KeysSounds.js';

const records = [];

const startStopButton = document.querySelector('#startStopRecordingButton');
const playSelectedButton = document.querySelector('.playSelectedButton');
const recordsContainer = document.querySelector('.recordsContainer');

let isRecording = false;
let currentRecording = {
  startTime: 0,
  endTime: 0,
  notes: []
};

startStopButton.addEventListener('click', toggleRecording);
playSelectedButton.addEventListener('click', playSelected);

function toggleRecording() {
  if (isRecording) {
    endRecording();
  } else {
    startRecording();
  }
  isRecording = !isRecording;
  updateButton(isRecording);
}

function startRecording() {
  currentRecording = {
    startTime: Date.now(),
    endTime: 0,
    notes: []
  };
}

function endRecording() {
  currentRecording.endTime = Date.now();
  if (currentRecording.notes.length > 0) {
    const recordingWithTimeStamps = currentRecording.notes.map(note => {
      return [note[0], note[1] - currentRecording.startTime];
    });
    records.push(recordingWithTimeStamps);
    displayRecord(records.length - 1);
  }
}

function displayRecord(index) {
  const exampleRecord = document.querySelector('#hiddenRecord');
  const newRecord = exampleRecord.cloneNode(true);
  newRecord.setAttribute('id', `record-${index}`);
  const playButton = newRecord.querySelector('.playRecordButton');
  const deleteButton = newRecord.querySelector('.deleteRecordButton');
  const checkBox = newRecord.querySelector('.selectedCheckbox');
  playButton.setAttribute('id', `play-${index}`);
  deleteButton.setAttribute('id', `delete-${index}`);
  checkBox.setAttribute('id', `select-${index}`);
  playButton.addEventListener('click', function () {
    playRecord(index);
  });
  deleteButton.addEventListener('click', function () {
    deleteRecord(index);
  });
  recordsContainer.appendChild(newRecord);
}

function updateButton(isRecording) {
  const buttonClass = isRecording ? 'buttonIsRecording' : 'buttonIsNotRecording';
  startStopButton.setAttribute('class', buttonClass);
}

function recordSound(sound) {
  playSound(sound);
  currentRecording.notes.push([sound, Date.now()]);
}

function playSound(sound) {
  if (!sound) {
    return;
  }
  const audioTag = document.querySelector(`#${sound}`);
  audioTag.currentTime = 0;
  audioTag.play();
}

function deleteRecord(index) {
  const record = document.querySelector(`#record-${index}`);
  record.remove();
}

function playRecord(index) {
  const record = records[index];
  record.forEach((element) => {
    setTimeout(function () {
      playSound(element[0]);
    }, element[1]);
  });
}

function playSelected() {
  const selectedCheckboxArray = Array.from(document.querySelectorAll('.selectedCheckbox'));
  const selectedRecordIndexes = selectedCheckboxArray
    .filter(checkbox => checkbox.checked)
    .map(checkbox => Number(checkbox.id.slice(-1)));
  selectedRecordIndexes.forEach(index => playRecord(index));
}

function handleKeyPress(event) {
  const sound = KeysSounds[event.key];
  if (sound !== undefined && isRecording) {
    recordSound(sound);
  }
}

document.addEventListener('keypress', handleKeyPress);
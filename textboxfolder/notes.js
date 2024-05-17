// Get the textarea element
const notes = document.getElementById('notes');

// Get the save button element
const saveButton = document.getElementById('save');

// Get the delete button element
const deleteButton = document.getElementById('delete');

// Get the save text file button element
const saveTextFileButton = document.getElementById('saveTextFile');

// Get the save PDF file button element
const savePdfFileButton = document.getElementById('savePdfFile');

// Load any existing notes from local storage
const existingNotes = localStorage.getItem('notes');
if (existingNotes) {
  // Set the value of the textarea to the existing notes
  notes.value = existingNotes;
}

// Save notes when the save button is clicked
saveButton.addEventListener('click', () => {
  // Set the 'notes' item in local storage to the current value of the textarea
  localStorage.setItem('notes', notes.value);
});

// Delete notes when the delete button is clicked
deleteButton.addEventListener('click', () => {
  // Clear the value of the textarea
  notes.value = '';
  // Remove the 'notes' item from local storage
  localStorage.removeItem('notes');
});

// Save notes as a text file when the save text file button is clicked
saveTextFileButton.addEventListener('click', () => {
  const text = notes.value;
  const fileName = prompt("Save as:", "notes");
  const blob = new Blob([text], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.txt`;
  link.click();
});

// Save notes as a PDF file when the save PDF file button is clicked
savePdfFileButton.addEventListener('click', () => {
  const text = notes.value;
  const fileName = prompt("Save as:", "notes");
  const pdf = new jsPDF();
  pdf.fromHTML(text);
  const pdfBlob = pdf.output("blob");
  const link = document.createElement('a');
  link.href = URL.createObjectURL(pdfBlob);
  link.download = `${fileName}.pdf`;
  link.click();
});
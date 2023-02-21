import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// Requirement: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("Update the database");

  // Create connection to the database and version
  const textEdit = await openDB("jate", 1);

  // Create a new transaction and specify database and data privileges.
  const tx = textEdit.transaction("jate", "readwrite");

  // Open up the desired object store
  const store = tx.objectStore("jate");

  // Pass in the content
  const request = store.add(content);

  // Confirm request
  const result = await request;
  console.log("text edits saved to the database!", result);
};

// Requirement: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET from the Database");

  // Create connection to the database and version
  const textEdit = await openDB("jate", 1);

  // Create a new transaction and specify database and data privileges.
  const tx = textEdit.transaction("jate", "readonly");

  // Open up the desired object store
  const store = tx.objectStore("jate");

  // Pass in the content
  const request = store.getAll();

  // Confirm request
  const result = await request;
  console.log("result.value", result);
  return result;
};

initdb();

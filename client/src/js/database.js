import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  export const putDb = async (content) => {
    try {
      const jateDb = await openDB("jate", 1);
      const result = await jateDb.put("jate", { id: 1, value: content });
      console.log("Data saved to the jateDB:", content);
    } catch (error) {
      console.error("Failed to save data to the jateDB:", error);
    }
  };
  
  export const getDb = async () => {
    try {
      const jateDb = await openDB("jate", 1);
      const result = await jateDb.get("jate", 1);
      if (result) {
        console.log("Received Data From Database:", result.value);
        return result.value;
      } else {
        console.log("Data Not Found");
        return null;
      }
    } catch (error) {
      console.error("Failed to retrieve data from the jateDB:", error);
      return null;
    }
  };
  

initdb();

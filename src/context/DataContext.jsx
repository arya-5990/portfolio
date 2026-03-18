import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    general: null,
    about: null,
    contact: null,
    skills: [],
    experiences: [],
    projects: [],
    certifications: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docNames = ['general', 'about', 'contact', 'skills', 'experiences', 'projects', 'certifications'];
        const dataPromises = docNames.map(name => getDoc(doc(db, 'portfolio', name)));
        
        const snapshots = await Promise.all(dataPromises);
        
        const newData = snapshots.reduce((acc, snap, index) => {
          const docName = docNames[index];
          if (snap.exists()) {
            acc[docName] = snap.data().data || snap.data(); 
          }
          return acc;
        }, {});

        setData({
          general: newData.general,
          about: newData.about,
          contact: newData.contact,
          skills: newData.skills || [],
          experiences: newData.experiences || [],
          projects: newData.projects || [],
          certifications: newData.certifications || []
        });

      } catch (error) {
        console.error("Error fetching data from Firestore: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, loading }}>
      {children}
    </DataContext.Provider>
  );
};

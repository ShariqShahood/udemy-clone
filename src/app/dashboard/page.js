"use client"; // Indicates this is a Client Component

import { useState, useEffect } from 'react';
import { db, auth } from '../../firebaseconfig';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Navbar from '../components/Navbar';

const AdminDashboard = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);  // State for image
  const [courses, setCourses] = useState([]);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const router = useRouter();
  const storage = getStorage();  // Initialize Firebase Storage

  // Check if the user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Fetch courses
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'courses'));
      const coursesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCourses(coursesData);
    } catch (error) {
      console.error("Error fetching courses: ", error);
    }
  };

  const uploadImage = async (imageFile) => {
    if (!imageFile) return null;

    const imageRef = ref(storage, `courses/${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  };

  
  const addOrUpdateCourse = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImage(image);
      }

      if (editingCourseId) {
        // Update course
        const courseRef = doc(db, 'courses', editingCourseId);
        await updateDoc(courseRef, {
          title,
          description,
          price,
          image: imageUrl || courses.find(course => course.id === editingCourseId).image,  // Keep the existing image if not uploading a new one
        });

        // Update the course in the local state
        setCourses((prevCourses) =>
          prevCourses.map((course) =>
            course.id === editingCourseId
              ? { ...course, title, description, price, image: imageUrl || course.image }
              : course
          )
        );
        setEditingCourseId(null);
      } else {
        // Add new course
        const docRef = await addDoc(collection(db, 'courses'), {
          title,
          description,
          price,
          image: imageUrl,
        });

        // Add the new course to the local state
        setCourses((prevCourses) => [
          ...prevCourses,
          { id: docRef.id, title, description, price, image: imageUrl },
        ]);
      }

      setTitle('');
      setDescription('');
      setPrice('');
      setImage(null);  // Reset image input
    } catch (error) {
      console.error("Error adding/updating document: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'courses', id));

      // Remove the course from the local state
      setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleEdit = (course) => {
    setTitle(course.title);
    setDescription(course.description);
    setPrice(course.price);
    setImage(null);  // Reset image input when editing
    setEditingCourseId(course.id);
  };

  // const handleLogout = () => {
  //   signOut(auth);
  //   router.push('/login');
  // };

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Admin Dashboard
        </h2>
        <form
          onSubmit={addOrUpdateCourse}
          className="bg-gray-50 p-6 rounded-lg shadow-md space-y-4 mb-8 animate__animated animate__fadeIn"
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Course Title"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Course Description"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Course Price"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none transition duration-300 ease-in-out"
          />
          <button
            type="submit"
            className={`w-full py-2 px-4 text-white font-semibold rounded-lg shadow-md focus:outline-none transition duration-300 ease-in-out ${
              editingCourseId
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {editingCourseId ? "Update Course" : "Add Course"}
          </button>
        </form>

        <ul className="space-y-4 animate__animated animate__fadeIn">
          {courses.map((course) => (
            <li
              key={course.id}
              className="bg-white p-6 rounded-lg shadow-md transition transform hover:scale-105 duration-300 ease-in-out"
            >
              <h3 className="text-3xl font-semibold text-gray-800">{course.title}</h3>
              {course.image && (
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover rounded-lg mt-4" style={{ width: '100%', height: 'auto' }}/>
              )}
              <p className="text-gray-600 mt-2">{course.description}</p>
              <p className="text-gray-800 mt-4 font-bold">${course.price}</p>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => handleEdit(course)}
                  className="py-2 px-4 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none transition duration-300 ease-in-out"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="py-2 px-4 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none transition duration-300 ease-in-out"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AdminDashboard;

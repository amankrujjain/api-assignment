"use client"
// use cient is used as useEffect is beign used and there is not any parent. So calling it here.

import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import UserCard from './Components/UserCard';
import Navbar from './Components/Navbar';
import { User } from './types/userInterface';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// using lodash libaray for debouncing
import {debounce} from "lodash"
import Loading from './Components/Loading';

function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [toastShown, setToastShown] = useState<{ success: boolean; error: boolean }>({ success: false, error: false });


  // Calling the api and fetching the data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        const users: User[] = await res.json();
        setUsers(users);
        setFilteredUsers(users);
        if (!toastShown.success) {
          toast.success('Users fetched successfully');
          setToastShown({ success: true, error: false });
        }
      } catch (error) {
        if (!toastShown.error) {
          toast.error('Error fetching users');
          setToastShown({ success: false, error: true });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toastShown]);


  // Handling debouncing logic here

  const handleSearch = useCallback(
    debounce((searchTerm: string) => {
      if (searchTerm === '') {
        setFilteredUsers(users);
      } else {
        const filtered = users.filter(user =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
      }
    }, 300),
    [users]
  );


  // Display the loading lottie component

  if (loading) {
    return <Loading/>;
  }

  return (
    <div>
      <Head>
        <title>User Cards</title>
        <meta name="description" content="Display user data in cards" />
      </Head>
      <Navbar onSearch={handleSearch} />
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default HomePage;
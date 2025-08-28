import { useState, useEffect } from "react";

const mockData = {
  totalInstitutes: 25,
  totalStudents: 1200,
  institutes: [
    { id: 1, name: "Institute A", city: "Mumbai", courses: 5, students: 200 },
    { id: 2, name: "Institute B", city: "Delhi", courses: 3, students: 150 },
  ],
  students: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      institute: "Institute A",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      institute: "Institute B",
    },
  ],
  reviews: [
    { id: 1, author: "Alice", content: "Great institute!", rating: 5 },
    { id: 2, author: "Bob", content: "Good experience.", rating: 4 },
  ],
  jobs: [
    {
      id: 1,
      title: "Math Teacher",
      institute: "Institute A",
      posted: "2025-08-01",
    },
    {
      id: 2,
      title: "Science Tutor",
      institute: "Institute B",
      posted: "2025-07-15",
    },
  ],
  team: {
    ceo: [{ id: 1, name: "CEO Name", role: "CEO", email: "ceo@nextute.com" }],
    founder: [
      {
        id: 2,
        name: "Founder Name",
        role: "Founder",
        email: "founder@nextute.com",
      },
    ],
    tech: [
      {
        id: 3,
        name: "Tech Lead",
        role: "Tech Lead",
        email: "tech@nextute.com",
      },
    ],
    marketing: [
      {
        id: 4,
        name: "Marketing Head",
        role: "Marketing Head",
        email: "marketing@nextute.com",
      },
    ],
    uiux: [
      {
        id: 5,
        name: "UI/UX Designer",
        role: "UI/UX Designer",
        email: "uiux@nextute.com",
      },
    ],
  },
};

const useAdminData = () => {
  const [adminData, setAdminData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasRenderedOnce, setHasRenderedOnce] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setAdminData(mockData);
        setHasRenderedOnce(true);
      } catch (err) {
        setError("Failed to fetch admin data");
      } finally {
        setDataLoading(false);
      }
    };
    fetchData();
  }, []);

  return { adminData, dataLoading, error, hasRenderedOnce };
};

export default useAdminData;

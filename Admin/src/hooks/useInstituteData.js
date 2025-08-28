import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const useInstituteData = () => {
  const { id } = useParams();
  const [instituteData, setInstituteData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasRenderedOnce, setHasRenderedOnce] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock data (replace with actual API call)
        const mockData = {
          id: parseInt(id) || 1,
          name: "Sample Institute",
          description: "A leading institute for education and innovation.",
          stats: {
            students: 1200,
            courses: 50,
          },
          achievements: [
            {
              title: "Best Institute 2024",
              description: "Awarded for excellence in education and innovation.",
              date: "2024-01-15",
            },
            {
              title: "Top Research Award",
              description: "Recognized for groundbreaking research in technology.",
              date: "2023-11-20",
            },
          ],
          image: null, // Replace with actual image URL from API or storage
        };

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // TODO: Replace with actual API call
        // const response = await fetch(`/api/institutes/${id}`);
        // if (!response.ok) throw new Error("Failed to fetch institute data");
        // const data = await response.json();
        // setInstituteData(data);

        setInstituteData(mockData);
      } catch (err) {
        setError(err.message || "An error occurred while fetching institute data");
      } finally {
        setDataLoading(false);
        setHasRenderedOnce(true);
      }
    };

    fetchData();
  }, [id]);

  return { instituteData, dataLoading, error, hasRenderedOnce };
};

export default useInstituteData;
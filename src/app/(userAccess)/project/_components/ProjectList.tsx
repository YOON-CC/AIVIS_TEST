"use client";

import { ReactNode, useEffect, useState } from "react";

interface Project {
  numberOfImages: ReactNode;
  id: number;
  name: string;
  ontologyName: string;
  created: string;
  updated: string;
  status: string;
}

export default function ProjectList() {
  const [token, setToken] = useState<string | null>(null);
  const [shortTermToken, setShortTermToken] = useState<string | null>(null);
  const [data, setData] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false); // 세부 정보를 표시할지 여부를 나타내는 상태

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedShortTermToken = localStorage.getItem("shortTermToken");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedShortTermToken) {
      setShortTermToken(storedShortTermToken);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/project.json`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setData(data.collection);
            console.log(data.collection[0].name);
            console.log(data);
          } else {
            console.error("Failed to fetch data");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [token]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };
  const closeModal = () => {
    setSelectedProject(null); // 선택된 프로젝트 초기화
  };

  const projectsPerPage = 10; // 페이지당 프로젝트 개수
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지를 추적하는 상태

  const lastProjectIndex = currentPage * projectsPerPage;
  const firstProjectIndex = lastProjectIndex - projectsPerPage;
  const currentProjects = data.slice(firstProjectIndex, lastProjectIndex);

  const totalPages = Math.ceil(data.length / projectsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main>
      <div>
        <h1>Project List</h1>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-evenly",
            background: "navy",
            color: "white",
            borderRadius: "5px",
          }}
        >
          <p>detailBtn</p>
          <p>name</p>
          <p>number of images</p>
          <p>created</p>
        </div>
        {data.length > 0 ? (
          <div>
            {currentProjects.map((project) => (
              <div
                key={project.id}
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  cursor: "pointer",
                  background:
                    selectedProject?.id === project.id ? "#e0e0e0" : "white",
                }}
              >
                <h4 onClick={() => handleProjectClick(project)}>
                  ▶상세입니다.
                </h4>
                <h4>{project.name}</h4>
                <h4>{project.numberOfImages}</h4>
                <h4>{new Date(Number(project.created)).toLocaleString()}</h4>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              style={{
                margin: "5px",
                background: currentPage === page ? "navy" : "white",
                color: currentPage === page ? "white" : "black",
              }}
            >
              {page}
            </button>
          )
        )}
      </div>
      {selectedProject && (
        <div
          style={{
            background: "black",
            marginTop: "20px",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "10px",
            color: "white",
            padding: "20px",
          }}
        >
          <span
            className="close"
            onClick={closeModal}
            style={{ fontSize: "30px", right: "-0" }}
          >
            &times;
          </span>{" "}
          <p>
            <strong>Name:</strong> {selectedProject.id}
          </p>
          <p>
            <strong>Ontology Name:</strong> {selectedProject.ontologyName}
          </p>
          <p>
            <strong>Created:</strong>{" "}
            {new Date(Number(selectedProject.created)).toLocaleString()}
          </p>
        </div>
      )}
    </main>
  );
}

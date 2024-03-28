import React, { useState, useEffect } from "react";
import axios from "axios";
import TopMenu from "./TopMenu";
import DataCard from "./DataCard";
import { TbFilterSearch, TbMoodSearch } from "react-icons/tb";
import Swal from "sweetalert2";
const Dashboard = () => {
  const BASE_URL = 'https://news-24-7-backend.onrender.com';
  // const BASE_URL = 'http://localhost:3001';
  const [activeButton, setActiveButton] = useState(null);
  const [datas, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    switch (buttonName) {
      case "intensity":
        intensityData();
        break;
      case "likelihood":
        likelihoodData();
        break;
      case "relevance":
        relevanceData();
        break;
      case "published":
        yearsData();
        break;
      case "country":
        countryData();
        break;
      case "topic":
        topicData();
        break;
      case "region":
        regionData();
        break;
      default:
        break;
    }
  };
  useEffect(async() => {
    await fetchAllData();
    await fetchFiltersData();
  }, []);
  const fetchAllData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/data`);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  const fetchFiltersData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/filterData`);
      setFilterData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  const intensityData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/data`);
      const sortedData = response.data.sort(
        (a, b) => a.intensity - b.intensity
      );
      setData(sortedData);
      console.log(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const likelihoodData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/data`);
      const sortedData = response.data.sort(
        (b, a) => a.likelihood - b.likelihood
      );
      setData(sortedData);
      // console.log(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const relevanceData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/data`);
      const sortedData = response.data.sort(
        (a, b) => b.relevance - a.relevance
      );
      setData(sortedData);
      // console.log(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const yearsData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/data`);
      // const parseDate = (dateString) => {
      //   const [month, year] = dateString.split(" ")[0].split(", ");
      //   return { month, year };
      // };
      const sortedData = response.data.sort((a, b) => {
        const dateA = new Date(a.published);
        const dateB = new Date(b.published);
        return dateB - dateA;
      });
      setData(sortedData);
      // console.log(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const countryData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/data`);
      const sortedData = response.data.sort((a, b) => {
        const countryA = a.country.toLowerCase();
        const countryB = b.country.toLowerCase();
        if (countryA === "" && countryB !== "") {
          return 1;
        } else if (countryA !== "" && countryB === "") {
          return -1;
        } else if (countryA < countryB) {
          return -1;
        } else if (countryA > countryB) {
          return 1;
        } else {
          return 0;
        }
      });
      setData(sortedData);
      // console.log(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const topicData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/data`);
      const sortedData = response.data.sort((a, b) => {
        const countryA = a.topic.toLowerCase();
        const countryB = b.topic.toLowerCase();
        if (countryA === "" && countryB !== "") {
          return 1;
        } else if (countryA !== "" && countryB === "") {
          return -1;
        } else if (countryA < countryB) {
          return -1;
        } else if (countryA > countryB) {
          return 1;
        } else {
          return 0;
        }
      });
      setData(sortedData);
      // console.log(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const regionData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/data`);
      const sortedData = response.data.sort((a, b) => {
        const countryA = a.region.toLowerCase();
        const countryB = b.region.toLowerCase();
        if (countryA === "" && countryB !== "") {
          return 1;
        } else if (countryA !== "" && countryB === "") {
          return -1;
        } else if (countryA < countryB) {
          return -1;
        } else if (countryA > countryB) {
          return 1;
        } else {
          return 0;
        }
      });
      setData(sortedData);
      // console.log(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // Filters API
  const [filters, setFilters] = useState({
    topics: "",
    swot: "",
    endYear: "",
    sector: "",
    pest: "",
    region: "",
    source: "",
    country: "",
    city: "",
  });
  const handleSearchButtonClick = async () => {
    const applyFiltersCheckbox = document.getElementById("applyFilters");
    if (applyFiltersCheckbox.checked) {
      const {
        topics,
        swot,
        endYear,
        sector,
        pest,
        region,
        source,
        country,
        city,
      } = filters;
      await allFiltersData(
        topics,
        swot,
        endYear,
        sector,
        pest,
        region,
        source,
        country,
        city
      );
      
    } else {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Please check the Apply Filters Before Search!",
        footer:
          '<a href="https://blackcoffer.com" target="_blank">visit us- www.backcoffer.com</a>',
      });
    }
  };
  const handleSwotRadioChange = (e) => {
    setFilters({ ...filters, swot: e.target.value });
  };
  const handlePestRadioChange = (e) => {
    setFilters({ ...filters, pest: e.target.value });
  };
  const allFiltersData = async (
    topics,
    swot,
    endYear,
    sector,
    pest,
    region,
    source,
    country,
    city
  ) => {
    try {
      const response = await axios.post(`${BASE_URL}/allFiltersData`,
        {
          topics,
          swot,
          endYear,
          sector,
          pest,
          region,
          source,
          country,
          city,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const allData = response.data;
      console.log(allData);
      if (allData.length > 0) {
        setData(allData);
        // console.log(allData);
        // clearAllFields();

        let timerInterval;
        Swal.fire({
          title:  `Total Records is Found: ${allData.length}`,
          html: "I will back in <b></b> milliseconds.",
          timer: 4000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      } else {
        let timerInterval;
        Swal.fire({
          title: "Filter Records Not Found!",
          html: "I will back in <b></b> milliseconds.",
          timer: 4000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
        await fetchAllData();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // Clear All Logics
  const clearAllFields = () => {
    setFilters({
      topics: "",
      endYear: "",
      sector: "",
      region: "",
      source: "",
      country: "",
      city: "",
    });
  };
  return (
    <div className="dashBoardStyleMain">
      <TopMenu data={datas} />
      <div className="newsDiv">
        <div className="chartsDashboard">
          <DataCard data={datas} />
        </div>
        <div className="topTrendingItemsDiv">
          <h2>Top Trending Terms</h2>
          <div className="topInsightButton">
            <button
              className={`currentbutton ${
                activeButton === "intensity" ? "active" : ""
              }`}
              onClick={() => handleButtonClick("intensity")}
            >
              <abbr title="Empty to Highest Value">Intensity</abbr>
            </button>
            <button
              className={`currentbutton ${
                activeButton === "likelihood" ? "active" : ""
              }`}
              onClick={() => handleButtonClick("likelihood")}
            >
              <abbr title="Highest Value to Empty">Likelihood</abbr>
            </button>
            <button
              className={`currentbutton ${
                activeButton === "relevance" ? "active" : ""
              }`}
              onClick={() => handleButtonClick("relevance")}
            >
              <abbr title="Highest Value to Empty">Relevance</abbr>
            </button>
            <button
              className={`currentbutton ${
                activeButton === "published" ? "active" : ""
              }`}
              onClick={() => handleButtonClick("published")}
            >
              <abbr title="Current Published Value to Older Date">Years</abbr>
            </button>
            <button
              className={`currentbutton ${
                activeButton === "country" ? "active" : ""
              }`}
              onClick={() => handleButtonClick("country")}
            >
              <abbr title="A-Z Name Wise">Country</abbr>
            </button>
            <button
              className={`currentbutton ${
                activeButton === "topic" ? "active" : ""
              }`}
              onClick={() => handleButtonClick("topic")}
            >
              <abbr title="Current Published Date to Older Date">Topics</abbr>
            </button>
            <button
              className={`currentbutton ${
                activeButton === "region" ? "active" : ""
              }`}
              onClick={() => handleButtonClick("region")}
            >
              <abbr title="A-Z Name Wise">Region</abbr>
            </button>
          </div>
          <div className="filterMainDiv">
            <h2>
              <span className="filtersIcons">
                ...
                <TbFilterSearch />
              </span>
              Filters
            </h2>
            <div className="commonStyleInput applyButton">
              <span className="applyFiltersSug">
                <input type="checkbox" id="applyFilters" />
                <label htmlFor="applyFilters">Apply Filters</label>
              </span>
              <button
                type="button"
                className="filtersWalaButton"
                onClick={handleSearchButtonClick}
              >
                Search
                <span>
                  <TbMoodSearch />
                </span>
              </button>
            </div>
            <div className="commonStyleInput clearAllButton">
              <button
                type="button"
                className="clearAllButton"
                onClick={clearAllFields}
              >
                Clear All
              </button>
            </div>
            <div className="commonStyleInput topicsFilters">
              <label htmlFor="topics">Topics</label>
              <input
                type="text"
                value={filters.topics}
                onChange={(e) =>
                  setFilters({ ...filters, topics: e.target.value })
                }
                list="topics"
                placeholder="Enter Topics..."
              />
              <datalist id="topics">
                {[...new Set(filterData.map((value) => value.topic))]
                  .filter((topic) => topic.trim() !== "")
                  .map((topic, index) => (
                    <option key={index} value={topic}>
                      {topic}
                    </option>
                  ))}
              </datalist>
            </div>
            <div class="commonStyleInput swotFilters">
              <label htmlFor="swot">SWOT</label>
              <div class="radio-row">
                <label htmlFor="strengths">Strengths</label>
                <input
                  type="radio"
                  name="swot"
                  id="strengths"
                  value="strengths"
                  checked={filters.swot === "strengths"}
                  onChange={handleSwotRadioChange}
                />
                <label htmlFor="weakness">Weakness</label>
                <input
                  type="radio"
                  name="swot"
                  id="weakness"
                  value="weakness"
                  checked={filters.swot === "weakness"}
                  onChange={handleSwotRadioChange}
                />
              </div>
              <div class="radio-row">
                <label htmlFor="opportunities">Opportunities</label>
                <input
                  type="radio"
                  name="swot"
                  id="opportunities"
                  value="opportunities"
                  checked={filters.swot === "opportunities"}
                  onChange={handleSwotRadioChange}
                />
                <label htmlFor="threats">Threats</label>
                <input
                  type="radio"
                  name="swot"
                  id="threats"
                  value="threats"
                  checked={filters.swot === "threats"}
                  onChange={handleSwotRadioChange}
                />
              </div>
            </div>
            <div className="commonStyleInput endYearFilters">
              <label htmlFor="endYear">End Year</label>
              <input
                type="number"
                value={filters.endYear}
                onChange={(e) =>
                  setFilters({ ...filters, endYear: e.target.value })
                }
                list="endYear"
                placeholder="Enter Year..."
              />
              <datalist id="endYear">
                {[...new Set(filterData.map((value) => value.end_year))]
                  .filter((year) => year)
                  .map((year, index) => (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  ))}
              </datalist>
            </div>
            <div className="commonStyleInput sectorFilters">
              <label htmlFor="sector">Sector</label>
              <input
                type="text"
                value={filters.sector}
                onChange={(e) =>
                  setFilters({ ...filters, sector: e.target.value })
                }
                list="sector"
                placeholder="Enter Sector..."
              />
              <datalist id="sector">
                {[...new Set(filterData.map((value) => value.sector))]
                  .filter((sector) => sector.trim() !== "")
                  .map((sector, index) => (
                    <option key={index} value={sector}>
                      {sector}
                    </option>
                  ))}
              </datalist>
            </div>
            <div class="commonStyleInput pestFilters">
              <label htmlFor="pest">PEST</label>
              <div class="radio-row">
                <label htmlFor="political">Political</label>
                <input
                  type="radio"
                  name="pest"
                  id="political"
                  value="political"
                  checked={filters.pest === "political"}
                  onChange={handlePestRadioChange}
                />
                <label htmlFor="economic">Economic</label>
                <input
                  type="radio"
                  name="pest"
                  id="economic"
                  value="economic"
                  checked={filters.pest === "economic"}
                  onChange={handlePestRadioChange}
                />
              </div>
              <div class="radio-row">
                <label htmlFor="social">Social</label>
                <input
                  type="radio"
                  name="pest"
                  id="social"
                  value="social"
                  checked={filters.pest === "social"}
                  onChange={handlePestRadioChange}
                />
                <label htmlFor="technological">Technological</label>
                <input
                  type="radio"
                  name="pest"
                  id="technological"
                  value="technological"
                  checked={filters.pest === "technological"}
                  onChange={handlePestRadioChange}
                />
              </div>
            </div>
            <div className="commonStyleInput regionFilters">
              <label htmlFor="region">Region</label>
              <input
                type="text"
                value={filters.region}
                onChange={(e) =>
                  setFilters({ ...filters, region: e.target.value })
                }
                list="region"
                placeholder="Enter Region..."
              />
              <datalist id="region">
                {[...new Set(filterData.map((value) => value.region))]
                  .filter((region) => region.trim() !== "")
                  .map((region, index) => (
                    <option key={index} value={region}>
                      {region}
                    </option>
                  ))}
              </datalist>
            </div>
            <div className="commonStyleInput sourceFilters">
              <label htmlFor="source">Source</label>
              <input
                type="text"
                value={filters.source}
                onChange={(e) =>
                  setFilters({ ...filters, source: e.target.value })
                }
                list="source"
                placeholder="Enter Source..."
              />
              <datalist id="source">
                {[...new Set(filterData.map((value) => value.source))]
                  .filter((source) => source.trim() !== "")
                  .map((source, index) => (
                    <option key={index} value={source}>
                      {source}
                    </option>
                  ))}
              </datalist>
            </div>
            <div className="commonStyleInput countryFilters">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                value={filters.country}
                onChange={(e) =>
                  setFilters({ ...filters, country: e.target.value })
                }
                list="country"
                placeholder="Enter Country..."
              />
              <datalist id="country">
                {[...new Set(filterData.map((value) => value.country))]
                  .filter((country) => country.trim() !== "")
                  .map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
              </datalist>
            </div>
            {/* <div className="commonStyleInput cityFilters">
              <label htmlFor="city">City</label>
              <input
                type="text"
                value={filters.city}
                onChange={(e) =>
                  setFilters({ ...filters, city: e.target.value })
                }
                list="city"
                placeholder="Enter City..."
              />

              <datalist id="city">
                {[...new Set(datas.map((value) => value.region))]
                  .filter((region) => region.trim() !== "")
                  .map((region, index) => (
                    <option key={index} value={region}>
                      {region}
                    </option>
                  ))}
              </datalist>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

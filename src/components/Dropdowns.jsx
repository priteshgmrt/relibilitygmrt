import React, { useState, useEffect, useMemo } from "react";
import Select from "react-select";
import * as XLSX from "xlsx";

const Dropdowns = ({ calculateReliability }) => {
  const [excelData, setExcelData] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [selectedSystems, setSelectedSystems] = useState([]);
  const [selectedAntennas, setSelectedAntennas] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  // Load Excel file from the public folder
  useEffect(() => {
    const fetchExcelData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/data.xlsx");
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        setExcelData(jsonData);
      } catch (error) {
        console.error("Error loading Excel file:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExcelData();
  }, []);

  const getUniqueOptions = (data, key, isYear = false) => {
    if (!data || !data.length) return [];
    let uniqueValues;
    if (isYear) {
      uniqueValues = [
        ...new Set(
          data
            .filter((row) => row[key])
            .map((row) => new Date(row[key]).getFullYear())
        ),
      ];
      uniqueValues.sort((a, b) => b - a); // Sort years in descending order
    } else {
      uniqueValues = [...new Set(data.map((row) => row[key]))];
      uniqueValues.sort(); // Sort alphabetically
    }
    const allOption = { value: "all", label: "All" };
    return [
      allOption,
      ...uniqueValues.map((value) => ({ value, label: value })),
    ];
  };

  const systemOptions = useMemo(() => getUniqueOptions(excelData, "System"), [excelData]);
  const antennaOptions = useMemo(() => getUniqueOptions(excelData, "Antenna"), [excelData]);
  const yearOptions = useMemo(() => getUniqueOptions(excelData, "PDate", true), [excelData]);

  const handleFilterRows = () => {
    let filtered = excelData;

    if (
      selectedSystems.length > 0 &&
      !selectedSystems.some((option) => option.value === "all")
    ) {
      const selectedSystemValues = selectedSystems.map(
        (option) => option.value
      );
      filtered = filtered.filter((row) =>
        selectedSystemValues.includes(row.System)
      );
    }

    if (
      selectedAntennas.length > 0 &&
      !selectedAntennas.some((option) => option.value === "all")
    ) {
      const selectedAntennaValues = selectedAntennas.map(
        (option) => option.value
      );
      filtered = filtered.filter((row) =>
        selectedAntennaValues.includes(row.Antenna)
      );
    }

    if (
      selectedYears.length > 0 &&
      !selectedYears.some((option) => option.value === "all")
    ) {
      const selectedYearValues = selectedYears.map((option) => option.value);
      filtered = filtered.filter((row) =>
        selectedYearValues.includes(new Date(row.PDate).getFullYear())
      );
    }

    if (keyword.trim()) {
      filtered = filtered.filter((row) =>
        Object.values(row).some(
          (value) =>
            value &&
            String(value).toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }

    setFilteredRows(filtered);
    calculateReliability(filtered); // Call the passed function
  };

  const handleSelectChange = (setterFunction, options) => {
    if (options.some((option) => option.value === "all")) {
      setterFunction(options.length === 1 ? [] : options);
    } else {
      setterFunction(options);
    }
  };

  return (
    <>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          <div className="dropdown-container">
            <div className="dropdown">
              <label>Year:</label>
              <Select
                options={yearOptions}
                isMulti
                onChange={(selected) =>
                  handleSelectChange(setSelectedYears, selected)
                }
                placeholder="Select year"
              />
            </div>
            <div className="dropdown">
              <label>Antenna:</label>
              <Select
                options={antennaOptions}
                isMulti
                onChange={(selected) =>
                  handleSelectChange(setSelectedAntennas, selected)
                }
                placeholder="Select antenna"
              />
            </div>
            <div className="dropdown">
              <label>System:</label>
              <Select
                options={systemOptions}
                isMulti
                onChange={(selected) =>
                  handleSelectChange(setSelectedSystems, selected)
                }
                placeholder="Select system"
              />
            </div>
          </div>
          <div className="keyword_p">
            <div className="dropdown">
              <label>Keyword:</label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Enter keyword..."
                className="key_mar"
              />
            </div>

            <button onClick={handleFilterRows} className="filter-button">
              Search
            </button>
            <br />
          </div>
        </>
      )}
    </>
  );
};

export default Dropdowns;

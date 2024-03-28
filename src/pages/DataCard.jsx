import React from "react";
const DataCard = ({ data }) => {
  return (
    <div className="">
      {data.map((value, index) => {
        return (
          <div className="card" key={index}>
            <div className="card-header">
              <h3>{value.title}</h3>
            </div>
            <div className="card-body">
              <p>
                <span className="valueFeild inshits">{value.insight}</span>
              </p>
              <p>
                Topic: <span className="valueFeild">{value.topic}</span>
              </p>
              <p>
                Sector: <span className="valueFeild">{value.sector}</span>
              </p>
              <p>
                Region: <span className="valueFeild">{value.region}</span>
              </p>
              <p>
                Country: <span className="valueFeild">{value.country}</span>
              </p>
              <div className="stylePublishedDiv">
                <div>
                  <p>
                    likelihood:
                    <span className="valueFeild">{value.likelihood}</span>
                  </p>
                  <p>
                    Intensity:{" "}
                    <span className="valueFeild">{value.intensity}</span>
                  </p>
                  <p>
                    Pestle: <span className="valueFeild">{value.pestle}</span>
                  </p>
                  <p>
                    Started Year:{" "}
                    <span className="valueFeild">{value.start_year}</span>
                  </p>
                  <p>
                    Ended Year:{" "}
                    <span className="valueFeild">{value.end_year}</span>
                  </p>
                </div>
                <div>
                  <p>
                    Impact: <span className="valueFeild">{value.impact}</span>
                  </p>
                  <p>
                    Relevance:{" "}
                    <span className="valueFeild">{value.relevance}</span>
                  </p>

                  <p>
                    Source: <span className="valueFeild">{value.source}</span>
                  </p>
                  <p>
                    Added On: <span className="valueFeild">{value.added}</span>
                  </p>
                  <p>
                    Published On:{" "}
                    <span className="valueFeild">{value.published}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <a
                className="buttonCssReadM"
                href={value.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DataCard;

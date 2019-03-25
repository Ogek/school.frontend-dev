//util function for fetch xml data and return root node
const fetchXml = async url => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Server error.");
    }
  
    const text = await response.text();
    const parser = new DOMParser();
    try {
      const xmlDocument = parser.parseFromString(text, "text/xml");
      return xmlDocument.children[0];
    } catch (error) {
      console.log("Error in parsing:", error.message);
    }
  };
  
  //util function for create tr and return it
  const createTr = ({ columns, childElement = "td", className = "" }) => {
    const tr = document.createElement("tr");
    tr.className = className;
    for (const { text, colspan = 1 } of columns) {
      const td = document.createElement(childElement);
      tr.appendChild(td);
      td.textContent = text;
      td.colSpan = colspan;
    }
    return tr;
  };
  
  //START SELECT FILLING
  const fetchCityList = apiUrl => {
    fetchXml(apiUrl).then(rootNode => loadCitiesIntoSelect(rootNode));
  };
  
  const loadCitiesIntoSelect = rootNode => {
    const select = document.getElementById("city-selector");
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
  
    select.append(document.createElement('option'));
    for (const el of rootNode.children) {
      if (el.tagName !== "link") {
        continue;
      }
  
      const opt = document.createElement("option");
      opt.label = el.children[0].textContent;
      opt.value = el.children[1].textContent;
      select.appendChild(opt);
    }
  };
  //END SELECT FILLING
  
  //feth city data and start render table
  const fetchCity = city => {
    fetchXml(`http://www.lamma.rete.toscana.it/previ/ita/xml/comuni_web/dati/${city}.xml`).
    then(rootNode => renderCityWeather(rootNode));
  };
  
  //render table by xml
  const renderCityWeather = rootNode => {
    const table = document.getElementById("city-table");
    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }
  
    const city = rootNode.getElementsByTagName("comune")[0].textContent;
    const lastUpdate = rootNode.getElementsByTagName("aggiornamento")[0].textContent;
    const almanacco = rootNode.getElementsByTagName("almanacco")[0];
    const sunrise = almanacco.getElementsByTagName("sole_sorge")[0].textContent;
    const sunset = almanacco.getElementsByTagName("sole_tramonta")[0].textContent;
  
    rows = [
      {
        columns: [
          {
            text: `Citta': ${city}`,
            colspan: 2
          },
          {
            text: `Ultimo aggiornamento: ${lastUpdate}`,
            colspan: 2
          }
        ],
        childElement: "th"
      },
      {
        columns: [
          {
            text: `Alba: ${sunrise}`,
            colspan: 2
          },
          {
            text: `Tramonto: ${sunset}`,
            colspan: 2
          }
        ],
        childElement: "th"
      }
    ];
  
    const daysMap = mapXmlToDaySchema(rootNode.getElementsByTagName("previsione"));
  
    for (k of daysMap.keys()) {
      const day = daysMap.get(k);
      const info = day.get("info");
      rows.push({
        columns: [
          {
            text: info.day
          },
          {
            text: info.descr
          },
          {
            text: info.temp_min ? `Temperatura minima ${info.temp_min}` : ""
          },
          {
            text: info.temp_max
              ? `Temperatura massima ${info.temp_max}`
              : ""
          }
        ],
        childElement: "td",
        className: "day"
      });
  
      if (day.get("details")) {
        for (const detail of day.get("details")) {
          rows.push({
            columns: [
              {
                text: detail.time
              },
              {
                text: detail.descr
              },
              {
                text: detail.probRain ? `Prob. pioggia ${detail.probRain}%` : ""
              },
              {
                text: detail.temp ? `Temperatura ${detail.temp}` : ""
              }
            ],
            childElement: "td"
          });
        }
      }
    }
  
    for (const row of rows) {
      table.appendChild(createTr(row));
    }
  };
  
  
  const mapXmlToDaySchema = (daysNodes) => {
    const dayInfo = el => {
      const info = {
        day: el.getAttribute("datadescr"),
        descr: el.getElementsByTagName("simbolo")[0].getAttribute("descr")
      };
  
      for (const t of el.getElementsByTagName("temp")) {
        info[`temp_${t.getAttribute("temp_type")}`] = t.textContent;
      }
      return info;
    };
  
    const dayDetails = el => {
      let probRain = "";
      const probRainNodes = el.getElementsByTagName("prob_rain");
      if(probRainNodes.length) {
          if(!isNaN(parseInt(probRainNodes[0].textContent))) {
            probRain = probRainNodes[0].textContent;
          }  
      }
      let temp;
      for (const t of el.getElementsByTagName("temp")) {
        if (t.getAttribute("temp_type") == "") {
          temp = t.textContent;
          break;
        }
      }
  
      return {
        time: el.getAttribute("ora"),
        descr: el.getElementsByTagName("simbolo")[0].getAttribute("descr"),
        probRain,
        temp
      };
    };
  
    const daysMap = new Map();
    for (const el of daysNodes) {
      const id = el.getAttribute("idday");
      const info = daysMap.get(id) || new Map();
  
      if (el.getAttribute("ora") === "giorno") {
        info.set("info", dayInfo(el));
      } else {
        const details = info.get("details") || [];
        details.push(dayDetails(el));
        info.set("details", details);
      }
      daysMap.set(id, info);
    }
    return daysMap;
  };
  
  const apiUrl = "http://www.lamma.rete.toscana.it/previ/ita/xml/lista_comuni.xml";
  fetchCityList(apiUrl);
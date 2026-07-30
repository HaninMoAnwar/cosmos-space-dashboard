'use strict'

/* Generated API Key */
let apiKey = 'uKdYpfIBQBmXT11e0ysZ8jgEefHCbVJTBct4Fu8J';

/* launches numbre limit  */
let launchesLimit = 10;



/***************   Sidebar Section HTML ***************/
const todayInSpaceSection = document.getElementById('today-in-space');
const launcheSection = document.getElementById('launches');
const planetSection = document.getElementById('planets');

/*************** Today Apod HTML ***************/

const adopDate = document.getElementById('apod-date');
const apodTitle = document.getElementById('apod-title');
const apodExplanation = document.getElementById('apod-explanation');
const apodDateDetail = document.getElementById('apod-date-detail');
const apodDateInput = document.getElementById('apod-date-input');
const apodDateInfo = document.getElementById('apod-date-info');
const apodMediaType = document.getElementById('apod-media-type');
const apodImageContainer = document.getElementById('apod-image-container');
const apodLoading = document.getElementById('apod-loading');
const apodImage = document.getElementById('apod-image');
const apodVideo = document.getElementById('apod-video');
const anchors = document.querySelectorAll('a');

/***************   Launches HTML  ***************/
const featuredLaunch = document.getElementById('featured-launch');
const launchServProvide = document.getElementById('launch-serv-provide');
const launchAbbrev = document.getElementById('launch-abbrev');
const launchShortName = document.getElementById('launch-short-name');
const launchRemainDays = document.getElementById('launch-remain-days');
const launchDate = document.getElementById('launch-date');
const launchTime = document.getElementById('launch-time');
const launchLocation = document.getElementById('launch-location');
const launchCountry = document.getElementById('launch-country');
const launchDescription = document.getElementById('launch-description');
const launchImg = document.getElementById('launch-img');
const launchGrid = document.getElementById('launches-grid');


/***************   Plants HTML  ***************/
const planetsGrid = document.getElementById('planets-grid')
const planetCards = document.querySelectorAll(".planet-card");
const planetDetailImg = document.getElementById("planet-detail-image");
const planetDetailName = document.getElementById("planet-detail-name");
const planetDetailDesc = document.getElementById("planet-detail-description");
const planetDistance = document.getElementById("planet-distance");
const planetRadius = document.getElementById("planet-radius");
const planetMass = document.getElementById("planet-mass");
const planetDensity = document.getElementById("planet-density");
const planetOrbitalPeriod = document.getElementById("planet-orbital-period");
const planetRotation = document.getElementById("planet-rotation");
const planetMoons = document.getElementById("planet-moons");
const planetGravity = document.getElementById("planet-gravity");
const planetDiscoverer = document.getElementById("planet-discoverer");
const planetDiscoveryDate = document.getElementById("planet-discovery-date");
const planetBodyType = document.getElementById("planet-body-type");
const planetVolume = document.getElementById("planet-volume");
const planetFactsList = document.getElementById("planet-facts");
const planetPerihelion = document.getElementById("planet-perihelion");
const planetAphelion = document.getElementById("planet-aphelion");
const planetEccentricity = document.getElementById("planet-eccentricity");
const planetInclination = document.getElementById("planet-inclination");
const planetAxialTilt = document.getElementById("planet-axial-tilt");
const planetTemp = document.getElementById("planet-temp");
const planetEscape = document.getElementById("planet-escape");


const planetComparison = document.getElementById("planet-comparison-tbody");


let defaultPlanet = {};
/**************************************************/
/***************   Sidebar Anchors  ***************/
/**************************************************/

/* Change anchors styling on click */
anchors.forEach(anch => {
    let clickedSection;
    anch.addEventListener('click', function (event) {
        /* Highlight the desired anchor */
        anchorsListHighlight(anch);

        /* Get the desired section */
        clickedSection = anch.getAttribute('data-section');

        pageChange(clickedSection);

    })
});
function anchorsListHighlight(desiredAnch) {
    /* Reset all anchors */
    anchors.forEach(eachAnch => {
        eachAnch.classList.remove('bg-blue-500/10', 'text-blue-400')
        eachAnch.classList.add('text-slate-300', 'hover:bg-slate-800')
    })
    /* hihglight the pressed anchor */
    desiredAnch.classList.remove('text-slate-300', 'hover:bg-slate-800')
    desiredAnch.classList.add('bg-blue-500/10', 'text-blue-400')

}
/**************************************************/
/*************** Today Apod Section ***************/
/**************************************************/
async function getTodayApod() {

    /* Display loading sign untill data is loaded  */
    displayLoading();

    try {

        let data = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
        let todayApodData = {}
        if (data.ok) {

            /* Get JSON data */
            data = await data.json();

            /* Store data */
            todayApodData.date = formatDate(data.date)
            todayApodData.exp = data.explanation
            todayApodData.title = data.title
            todayApodData.mType = data.media_type
            todayApodData.url = data.url



            /* Display data */
            displayTodayApod(todayApodData);

        }
        else {
            throw Error(`Failed to fetch Today Space Apod ${data.status}`)
        }
    } catch (error) {
        console.log(error.message);

    }
}

/* display today apod section */
function displayTodayApod(displayData) {


    /* Hide loading sign */
    apodLoading.classList.add('hidden');

    adopDate.innerHTML = `Astronomy Picture of the Day - ${displayData.date}`
    apodTitle.innerHTML = `${displayData.title}`
    apodExplanation.innerHTML = `${displayData.exp}`
    apodDateDetail.lastChild.textContent = `${displayData.date}`
    apodDateInput.nextElementSibling.innerHTML = `${displayData.date}`
    apodDateInfo.innerHTML = `${displayData.date}`
    apodMediaType.innerHTML = `${displayData.mType}`

    if (displayData.mType === 'video') {
        apodVideo.classList.remove('hidden')
        apodVideo.setAttribute('src', displayData.url);

        apodImageContainer.querySelector('button').classList.add('hidden', 'hover:bg-white/20')
        apodImageContainer.classList.remove('group')
    }
    else if (displayData.mType === 'image') {
        apodImage.classList.remove('hidden')
        apodImage.setAttribute('src', displayData.url);
        apodImageContainer.querySelector('button').classList.remove('hidden', 'hover:bg-white/20')
        apodImageContainer.classList.add('group')
    }

}
/* Open image in full resolution */
apodImageContainer.querySelector('button').addEventListener('click', function () {
    window.open(apodImage.getAttribute('src'), '_blank')
})
/* Display loading during data waiting */
function displayLoading() {

    adopDate.innerHTML = `Loading...`
    apodTitle.innerHTML = `Loading...`
    apodExplanation.innerHTML = `Loading...`
    apodDateDetail.lastChild.textContent = `Loading...`
    apodDateInput.nextElementSibling.innerHTML = `Loading...`
    apodDateInfo.innerHTML = `Loading...`

    apodLoading.classList.remove('hidden');

}
/* Helper date formating function  */
function formatDate(dateStr) {
    const [year, month, day] = dateStr.split('-');
    const date = new Date(year, month - 1, day);

    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }).format(date);
}



/* Exhcnage the tabs */
function pageChange(desiredSection) {
    let anchorSection;
    switch (desiredSection) {
        case 'today-in-space':
            todayInSpaceSection.classList.remove('hidden');
            launcheSection.classList.add('hidden');
            planetSection.classList.add('hidden');
            anchorSection = anchors[0];
            break;
        case 'launches':
            todayInSpaceSection.classList.add('hidden');
            launcheSection.classList.remove('hidden');
            planetSection.classList.add('hidden');
            anchorSection = anchors[1];
            break;
        case 'planets':
            todayInSpaceSection.classList.add('hidden');
            launcheSection.classList.add('hidden');
            planetSection.classList.remove('hidden');
            anchorSection = anchors[2];
            break;
    }
    anchorsListHighlight(anchorSection);

}

/**************************************************/
/*************** Launchers Section ***************/
/**************************************************/
async function getLaunchers() {
    let launcheList = [];
    try {
        let data = await fetch(`https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=${launchesLimit}`)
        if (data.ok) {
            let dataList = await data.json();
            dataList = dataList.results;

            for (let i = 0; i < dataList.length; i++) {
                let launcheData = {
                    name: dataList[i].name,
                    date: new Date(dataList[i].net),
                    abbrev: dataList[i].status.abbrev,
                    location: dataList[i].pad.location.name,
                    country: dataList[i].pad.country.name,
                    servProvider: dataList[i].launch_service_provider.name,
                    shortName: dataList[i].rocket.configuration.name,
                    img: dataList[i].image.image_url,
                    desc: dataList[i].mission.description,
                };

                launcheList.push(launcheData)
            }

            /* Display launches data */
            displayAllLaunches(launcheList)


        }
        else {
            throw Error(`Failed to fetch laucnhes ${data.status}`)
        }
    } catch (error) {
        console.log(error.message);

    }
}
function displayAllLaunches(displayData) {

    /* display featured launch */
    displayFeaturedLaunch(displayData[0]);

    /* Display the rest of launches */
    displayGridLaunches(displayData.slice(1))

}
function displayFeaturedLaunch(data) {
    featuredLaunch.getElementsByTagName('h3')[0].innerHTML = data.name;
    launchAbbrev.innerHTML = data.abbrev;
    launchServProvide.innerHTML = data.servProvider;
    launchShortName.innerHTML = data.shortName;

    launchDate.innerHTML = data.date.toDateString();


    const timeString = data.date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: 'UTC'
    });


    launchTime.innerHTML = timeString + ` UTC`;
    launchLocation.innerHTML = data.location
    launchCountry.innerHTML = data.country
    launchDescription.innerHTML = data.desc
    launchImg.setAttribute('src', data.img)
    launchImg.setAttribute('alt', data.name)

    /* Display remain days */
    displayRemainDays(data.date);
}
function displayGridLaunches(data) {
    let box = ``;

    for (const element of data) {
        let timeString = element.date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZone: 'UTC'
        });
        let dateString = element.date.toLocaleString('en-US', {
            month: 'long', year: 'numeric', day: 'numeric'
        });

        box += `<div
            class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer">
            <div class="relative h-48 bg-slate-900/50 flex items-center justify-center">
            <img class="w-full h-full object-cover" src= "${element.img}" alt="${element.name}" onerror="this.src='https://cosmos-space-dashboard-route.vercel.app/images/launch-placeholder.png'">  
            <div class="absolute top-3 right-3">
                <span class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold">
                  ${element.abbrev}
                </span>
              </div>
            </div>
            <div class="p-5">
              <div class="mb-3">
                <h4 class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  ${element.name}
                </h4>
                <p class="text-sm text-slate-400 flex items-center gap-2">
                  <i class="fas fa-building text-xs"></i>
                  ${element.servProvider}
                </p>
              </div>
              <div class="space-y-2 mb-4">
                <div class="flex items-center gap-2 text-sm">
                  <i class="fas fa-calendar text-slate-500 w-4"></i>
                  <span class="text-slate-300">${dateString}</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <i class="fas fa-clock text-slate-500 w-4"></i>
                  <span class="text-slate-300">${timeString} UTC</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <i class="fas fa-rocket text-slate-500 w-4"></i>
                  <span class="text-slate-300">${element.shortName}</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                  <span class="text-slate-300 line-clamp-1">${element.location}</span>
                </div>
              </div>
              <div class="flex items-center gap-2 pt-4 border-t border-slate-700">
                <button
                  class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold">
                  Details
                </button>
                <button class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                  <i class="far fa-heart"></i>
                </button>
              </div>
            </div>
          </div>`
    }
    launchGrid.innerHTML = box;
}
function displayRemainDays(tripDate) {

    /* get the current date */
    let currentDate = new Date();


    tripDate.setHours(0, 0, 0);
    currentDate.setHours(0, 0, 0)

    if (currentDate < tripDate) {
        /* the trip is incoming */

        /* Display remain days */
        launchRemainDays.classList.add('inline-flex', 'bg-linear-to-r', 'from-blue-500/20', 'to-purple-500/20')

        for (const element of launchRemainDays.children) {
            element.classList.remove('hidden')
        }
        const diffTime = tripDate - currentDate;
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        launchRemainDays.querySelector('p').innerHTML = diffDays;

    }

    else {
        /* the trip is today */
        /* hide remain days */
        launchRemainDays.classList.remove('inline-flex', 'bg-linear-to-r', 'from-blue-500/20', 'to-purple-500/20')

        for (const element of launchRemainDays.children) {
            element.classList.add('hidden')
        }
    }
}

/**************************************************/
/*************** Plants Section ***************/
/**************************************************/
async function getPlants() {
    let plantsList = [];
    try {
        let data = await fetch(`https://solar-system-opendata-proxy.vercel.app/api/planets`)
        if (data.ok) {
            let dataList = await data.json();
            dataList = dataList.bodies;

            for (let i = 0; i < dataList.length; i++) {
                let plantData = {
                    name: dataList[i].englishName,
                    desc: dataList[i].description,
                    img: dataList[i].image,
                    semiAxis: dataList[i].semimajorAxis,
                    distance: (dataList[i].semimajorAxis / 149597870).toFixed(2),
                    meanRadius: dataList[i].meanRadius,
                    diameter: dataList[i].meanRadius * 2,
                    massValue: dataList[i].mass.massValue,
                    massExponent: dataList[i].mass.massExponent,
                    density: dataList[i].density,
                    orbitalPeriod: dataList[i].sideralOrbit,
                    sideralRotation: dataList[i].sideralRotation,
                    gravity: dataList[i].gravity,
                    descoverdBy: dataList[i].discoveredBy,
                    discoveryDate: dataList[i].discoveryDate,
                    bodyType: dataList[i].bodyType,
                    volValue: dataList[i].vol.volValue,
                    volExponent: dataList[i].vol.volExponent,
                    axialTilt: dataList[i].axialTilt,
                    perihelion: dataList[i].perihelion,
                    aphelion: dataList[i].aphelion,
                    eccentricity: dataList[i].eccentricity,
                    inclination: dataList[i].inclination,
                    avgTemp: dataList[i].avgTemp,
                    velocity: dataList[i].escape,
                    type: dataList[i].type,
                    moons: dataList[i].moons,
                };
                if ((plantData.name).toLowerCase() === 'earth') {
                    defaultPlanet = { ...plantData }

                }
                plantsList.push(plantData)
            }
            console.log(plantsList);

            /* Display plants data */
            displayAllPlants(plantsList)

            /* Display default planet details */
            updatePlanetDetails(defaultPlanet);

            /* Display planets comparison */
            displayPlanetsComp(plantsList);
        }
        else {
            throw Error(`Failed to fetch laucnhes ${data.status}`)
        }
    } catch (error) {
        console.log(error.message);

    }
}
function displayAllPlants(displayData) {

    /* Display plants grid */
    const plantsImg = planetsGrid.querySelectorAll('img')
    const plantsHeader = planetsGrid.querySelectorAll('h4')
    const plantsParag = planetsGrid.querySelectorAll('p')
    for (let i = 0; i < displayData.length; i++) {
        plantsImg[i].setAttribute('src', displayData[i].img)
        plantsImg[i].setAttribute('alt', displayData[i].name)

        plantsHeader[i].innerHTML = displayData[i].name
        plantsParag[i].innerHTML = displayData[i].distance + ' AU'

        /* Set the proper ID */
        planetCards[i].setAttribute('data-planet-id', displayData[i].name)
    }

    planetCards.forEach((card) => {
        card.addEventListener("click", () => {
            const planetId = card.getAttribute("data-planet-id");
            const planetIndex = displayData.findIndex(planet => planet.name === planetId);



            updatePlanetDetails(displayData[planetIndex]);
        });
    });



}
function updatePlanetDetails(data) {

    planetDetailName.innerHTML = data.name
    planetDetailDesc.innerHTML = data.desc;
    planetDetailImg.setAttribute('src', data.img);
    planetDistance.innerHTML = (data.semiAxis / 1e6).toFixed(1) + 'M km';
    planetRadius.innerHTML = (data.meanRadius).toFixed(0) + ' km';
    planetMass.innerHTML = (data.massValue) + ' × 10^' + data.massExponent + ' kg';
    planetDensity.innerHTML = (data.density).toFixed(2) + ' g/cm³';
    planetOrbitalPeriod.innerHTML = (data.orbitalPeriod).toFixed(2) + ' days';
    planetRotation.innerHTML = (data.sideralRotation).toFixed(2) + ' hours';
    planetMoons.innerHTML = (data.moons ? data.moons.length : 0);
    planetGravity.innerHTML = (data.gravity) + ' m/s²';


    planetDiscoverer.innerHTML = data.discoveredBy;
    planetDiscoveryDate.innerHTML = data.discoveryDate;
    planetBodyType.innerHTML = data.bodyType;
    planetVolume.innerHTML = data.volValue + ' × 10^ ' + data.volExponent + ' km³';

    planetPerihelion.innerHTML = (data.perihelion / 1e6).toFixed(1) + 'M km';
    planetAphelion.innerHTML = (data.aphelion / 1e6).toFixed(1) + 'M km';
    planetEccentricity.innerHTML = (data.eccentricity);
    planetInclination.innerHTML = (data.inclination);
    planetAxialTilt.innerHTML = (data.axialTilt).toFixed(2);
    planetTemp.innerHTML = (data.avgTemp) + '°C';
    planetEscape.innerHTML = (data.velocity / 1e3) + ' km/s';

    planetFactsList.querySelectorAll('span')[0].innerHTML = 'Mass: ' + (data.massValue) + ' × 10^' + data.massExponent + ' kg'
    planetFactsList.querySelectorAll('span')[1].innerHTML = 'Surface gravity: ' + (data.gravity) + ' m/s²'
    planetFactsList.querySelectorAll('span')[2].innerHTML = 'Density: ' + (data.density).toFixed(2) + ' g/cm³'
    planetFactsList.querySelectorAll('span')[3].innerHTML = 'Axial tilt: ' + (data.axialTilt).toFixed(2)


}
function displayPlanetsComp(planets) {
    let box = ``
    const bgArr = {
        mercury: '#6b7280"',
        venus: '#f97316',
        earth: '#3b82f6',
        mars: '#ef4444',
        jupiter: '#fb923c',
        saturn: '#facc15',
        uranus: '#06b6d4',
        neptune: '#2563eb'
    }
    
    for (let i = 0; i < planets.length; i++) {
        let bgIndex = planets[i].name.toLowerCase();
        box += `<tr class="hover:bg-slate-800/30 transition-colors ${bgIndex === 'earth'?'bg-blue-500/5':''}">
                    <td class="px-4 md:px-6 py-3 md:py-4 sticky left-0 bg-slate-800 z-10">
                      <div class="flex items-center space-x-2 md:space-x-3">
                        <div class="w-6 h-6 md:w-8 md:h-8 rounded-full flex-shrink-0" style="background-color: ${bgArr[bgIndex]}">
                        </div>
                        <span class="font-semibold text-sm md:text-base whitespace-nowrap">${planets[i].name}</span>
                      </div>
                    </td>
                    <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
                      ${planets[i].distance}
                    </td>
                    <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
                      ${(planets[i].diameter).toFixed(0)}
                    </td>
                    <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
                      ${(planets[i].massValue/0.597).toFixed(2)}
                    </td>
                    <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
                      ${(planets[i].orbitalPeriod/365).toFixed(1)} years
                    </td>
                    <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
                      ${planets[i].moons?planets[i].moons.length:0}
                    </td>
                    <td class="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <span class="px-2 py-1 rounded text-xs bg-orange-500/50 text-orange-200">${planets[i].type}</span>
                    </td>
                  </tr>`
    }
    planetComparison.innerHTML = box;
}
getTodayApod();
getLaunchers();
getPlants();



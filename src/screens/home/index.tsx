import { useEffect, useState } from "react";

import { Coordinates } from "src/model/coordinates";
import { Dashboard } from "src/components/Dashboard/index";
import Header from "src/components/Header/index";
import { useWeather } from "src/services/hooks/useWeather";

export default function Home() {
  const [coordinates, setCoordinates] = useState<Coordinates | undefined>();

  const { city } = useWeather({ coordinates });

  const success = (pos: { coords: any }) => {
    var crd = pos.coords;
    if (crd.longitude && crd.latitude)
      setCoordinates({ lat: crd.latitude, lon: crd.longitude });
  };

  const checkLocationPermissions = (result: any) => {
    if (result.state === "granted") {
      navigator.geolocation.getCurrentPosition(success);
    } else if (result.state === "prompt") {
      navigator.geolocation.getCurrentPosition(
        success,
        () => {
          throw new Error("Geolocation not founded");
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else if (result.state === "denied") {
      throw new Error("Geolocation changed");
    }
  };
  useEffect(() => {
    try {
      if (navigator.geolocation) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then(function (result) {
            checkLocationPermissions(result);
            result.onchange = function (result) {
              checkLocationPermissions(result);
            };
          });
      }
    } catch (e) {
      alert("Sorry Not available!");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header city={city} />
      <Dashboard />
    </>
  );
}

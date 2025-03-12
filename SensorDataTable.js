import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const SensorDataTable = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("sensor_data")
        .select("*")
        .order("timestamp", { ascending: false });

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setSensorData(data);
      }
    };

    fetchData();

    const subscription = supabase
      .channel("realtime sensor_data")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "sensor_data" },
        (payload) => {
          console.log("New data received:", payload);
          setSensorData((prevData) => [payload.new, ...prevData]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4 text-center">Live Sensor Data</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border px-4 py-2">Device ID</th>
              <th className="border px-4 py-2">Timestamp</th>
              <th className="border px-4 py-2">Voltage</th>
              <th className="border px-4 py-2">Current</th>
              <th className="border px-4 py-2">Power</th>
              <th className="border px-4 py-2">Fuel Level</th>
              <th className="border px-4 py-2">Temperature</th>
              <th className="border px-4 py-2">Humidity</th>
            </tr>
          </thead>
          <tbody>
            {sensorData.map((data, index) => (
              <tr key={index} className="border">
                <td className="border px-4 py-2">{data.device_id}</td>
                <td className="border px-4 py-2">
                  {data.timestamp ? new Date(data.timestamp).toLocaleString() : "N/A"}
                </td>
                <td className="border px-4 py-2">{data.voltage}</td>
                <td className="border px-4 py-2">{data.current}</td>
                <td className="border px-4 py-2">{data.power}</td>
                <td className="border px-4 py-2">{data.fuel_level}</td>
                <td className="border px-4 py-2">{data.temperature}</td>
                <td className="border px-4 py-2">{data.humidity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SensorDataTable;

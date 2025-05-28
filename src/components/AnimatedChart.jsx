import React, { useState, useEffect } from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const AnimatedChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Função para gerar dados aleatórios
    const generateData = () => {
      const newData = [];
      for (let i = 0; i < 20; i++) {
        newData.push({
          value: Math.floor(Math.random() * 40) + 10,
        });
      }
      return newData;
    };

    // Inicializa com dados
    setData(generateData());

    // Atualiza os dados a cada 3 segundos
    const intervalId = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData];
        
        // Remove o primeiro ponto e adiciona um novo no final
        newData.shift();
        newData.push({
          value: Math.floor(Math.random() * 40) + 10,
        });
        
        return newData;
      });
    }, 3000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#006916" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8bc34a" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke="#006916"
          fillOpacity={1}
          fill="url(#colorValue)"
          isAnimationActive={true}
          animationDuration={1000}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AnimatedChart;

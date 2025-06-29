// src/routes/gimnasios/component.tsx
import { useGimnasios } from '../../../lib/gimnasios-graphql';

export function GimnasiosPage() {
  const { data, isLoading, error } = useGimnasios();

  if (isLoading) return <p>⏳ Cargando gimnasios...</p>;
  if (error) return <p className="text-red-500">❌ {error.message}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gimnasios</h1>
      <ul className="space-y-2">
        {data?.map((g) => (
          <li key={g.id} className="border rounded p-4">
            <strong>{g.nombre}</strong><br />
            {g.direccion}<br />
            <small>{g.telefono}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

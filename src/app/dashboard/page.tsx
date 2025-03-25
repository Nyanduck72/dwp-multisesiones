"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Order = {
  id: number;
  items: string[];
  total: number;
};

export default function Dashboard() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const orders: Order[] = [
    {
      id: 1,
      items: ["Combo Agrandado Double Western Bacon"],
      total: 233,
    },
    {
      id: 2,
      items: ["Combo Double Western Bacon", "Nieve de Vainilla"],
      total: 240,
    },
    {
      id: 3,
      items: ["Combo Agrandado Double Western Bacon"],
      total: 233,
    },
    {
      id: 4,
      items: ["Combo Agrandado Double Western Bacon"],
      total: 233,
    },
    {
      id: 5,
      items: ["Biscuit"],
      total: 79,
    },
    {
      id: 6,
      items: ["Combo Agrandado Double Western Bacon"],
      total: 233,
    },
    {
      id: 7,
      items: ["Biscuit"],
      total: 79,
    },
    {
      id: 8,
      items: ["Combo Agrandado Double Western Bacon"],
      total: 233,
    },
    {
      id: 9,
      items: ["Biscuit"],
      total: 79,
    },
    {
      id: 10,
      items: ["Nieve de Vainilla"],
      total: 40,
    },
  ];

  const calculateTotal = () => {
    return orders.reduce((acc, order) => acc + order.total, 0);
  };

  if (session && session.user) {
    return (
      <div className="grid grid-cols-2 gap-4">
        <h1 className="col-span-2 p-2 text-4xl text-white">
          Welcome, {user?.name || "User"}!
        </h1>
        <div className="col-span-2 bg-neutral-600 border-none rounded-lg w-[99%] mx-auto px-2 py-4">
          <h2 className="text-xl text-center">Ordenes Recientes</h2>
          <div className="h-36 mt-4 overflow-x-auto flex flex-nowrap gap-4">
            {orders.map((order: Order) => {
              return (
                <div
                  key={order.id}
                  className="overflow-y-scroll rounded-lg p-2 h-full w-64 bg-neutral-100 text-black shadow-lg flex-shrink-0 flex flex-col gap-2 justify-between"
                >
                  <div>
                    <h3 className="text-md font-bold">Orden #{order.id}</h3>
                    <ul>
                      {order.items.map((item: string, index: number) => {
                        return (
                          <li key={index} className="list-disc list-inside">
                            {item}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <p>Total: ${order.total}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-neutral-600 border-none rounded-lg w-[99%] flex flex-row gap-2 mx-auto py-4">
          <h2 className="text-xl text-center w-full">
            Gasto Semanal: ${calculateTotal()}
          </h2>
        </div>
        <div className="bg-neutral-600 border-none rounded-lg w-[99%] flex flex-row gap-2 mx-auto py-4">
          <h2 className="text-xl text-center w-full">
            Promedio Diario: ${(calculateTotal() / 7).toFixed(2)}
          </h2>
        </div>
      </div>
    );
  }
  return null;
}

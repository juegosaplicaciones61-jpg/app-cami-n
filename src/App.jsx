import React, { useState, useEffect } from "react";
export default function TruckFinanceApp() {

  /* =========================
     ESTADOS
  ========================= */

  const [activeTab, setActiveTab] = useState("dashboard");

  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [incomeForm, setIncomeForm] = useState({
    client: "",
    route: "",
    value: "",
    date: "",
  });

  const [expenseForm, setExpenseForm] = useState({
    type: "",
    description: "",
    value: "",
    date: "",
  });

  /* =========================
     CARGAR DATOS
  ========================= */

  useEffect(() => {

    loadIncome();
    loadExpenses();

  }, []);

  const loadIncome = async () => {

    try {

      const response = await fetch(
        "https://app-camion-backend-production.up.railway.app/income"
      );

      const data = await response.json();

      setIncome(data);

    } catch (error) {

      console.log(error);

    }

  };

  const loadExpenses = async () => {

    try {

      const response = await fetch(
        "https://app-camion-backend-production.up.railway.app/expenses"
      );

      const data = await response.json();

      setExpenses(data);

    } catch (error) {

      console.log(error);

    }

  };

  /* =========================
     TOTALES
  ========================= */

  const totalIncome = income.reduce(
    (acc, item) => acc + Number(item.value),
    0
  );

  const totalExpenses = expenses.reduce(
    (acc, item) => acc + Number(item.value),
    0
  );

  const netProfit = totalIncome - totalExpenses;

  /* =========================
     AGREGAR INGRESO
  ========================= */

  const addIncome = async () => {

    try {

      const response = await fetch(
        "https://app-camion-backend-production.up.railway.app/income",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(incomeForm)
        }
      );

      const data = await response.text();

      alert(data);

      setIncomeForm({
        client: "",
        route: "",
        value: "",
        date: "",
      });

      loadIncome();

    } catch (error) {

      console.log(error);
      alert("Error guardando ingreso");

    }

  };

  /* =========================
     AGREGAR GASTO
  ========================= */

  const addExpense = async () => {

    try {

      const response = await fetch(
        "https://app-camion-backend-production.up.railway.app/expenses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(expenseForm)
        }
      );

      const data = await response.text();

      alert(data);

      setExpenseForm({
        type: "",
        description: "",
        value: "",
        date: "",
      });

      loadExpenses();

    } catch (error) {

      console.log(error);
      alert("Error guardando gasto");

    }

  };

  /* =========================
     ELIMINAR INGRESO
  ========================= */

  const deleteIncome = async (id) => {

    try {

      await fetch(
        `https://app-camion-backend-production.up.railway.app/income/${id}`,
        {
          method: "DELETE",
        }
      );

      loadIncome();

    } catch (error) {

      console.log(error);

    }

  };

  /* =========================
     ELIMINAR GASTO
  ========================= */

  const deleteExpense = async (id) => {

    try {

      await fetch(
        `https://app-camion-backend-production.up.railway.app/expenses/${id}`,
        {
          method: "DELETE",
        }
      );

      loadExpenses();

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="bg-black text-white rounded-3xl p-6 shadow-2xl mb-6">

          <h1 className="text-4xl font-bold">
            Control Financiero del Camión
          </h1>

          <p className="text-gray-300 mt-2">
            Sistema para controlar ingresos y gastos
          </p>

        </div>

        {/* BOTONES */}

        <div className="flex flex-wrap gap-3 mb-6">

          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-5 py-3 rounded-2xl font-semibold transition ${
              activeTab === "dashboard"
                ? "bg-black text-white"
                : "bg-white shadow"
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab("income")}
            className={`px-5 py-3 rounded-2xl font-semibold transition ${
              activeTab === "income"
                ? "bg-black text-white"
                : "bg-white shadow"
            }`}
          >
            Ingresos
          </button>

          <button
            onClick={() => setActiveTab("expenses")}
            className={`px-5 py-3 rounded-2xl font-semibold transition ${
              activeTab === "expenses"
                ? "bg-black text-white"
                : "bg-white shadow"
            }`}
          >
            Gastos
          </button>

        </div>

        {/* DASHBOARD */}

        {activeTab === "dashboard" && (

          <div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">

              <div className="bg-white rounded-3xl p-6 shadow-xl">

                <h2 className="text-lg font-semibold text-gray-500">
                  Ingresos Totales
                </h2>

                <p className="text-4xl font-bold mt-4 text-green-600">
                  ${totalIncome.toLocaleString()}
                </p>

              </div>

              <div className="bg-white rounded-3xl p-6 shadow-xl">

                <h2 className="text-lg font-semibold text-gray-500">
                  Gastos Totales
                </h2>

                <p className="text-4xl font-bold mt-4 text-red-600">
                  ${totalExpenses.toLocaleString()}
                </p>

              </div>

              <div className="bg-white rounded-3xl p-6 shadow-xl">

                <h2 className="text-lg font-semibold text-gray-500">
                  Ganancia Neta
                </h2>

                <p className="text-4xl font-bold mt-4 text-blue-600">
                  ${netProfit.toLocaleString()}
                </p>

              </div>

            </div>

          </div>

        )}

        {/* INGRESOS */}

        {activeTab === "income" && (

          <div className="grid lg:grid-cols-2 gap-6">

            <div className="bg-white rounded-3xl p-6 shadow-xl">

              <h2 className="text-3xl font-bold mb-6">
                Registrar Ingreso
              </h2>

              <div className="space-y-4">

                <input
                  type="text"
                  placeholder="Cliente"
                  value={incomeForm.client}
                  onChange={(e) =>
                    setIncomeForm({
                      ...incomeForm,
                      client: e.target.value,
                    })
                  }
                  className="w-full border rounded-2xl p-4"
                />

                <input
                  type="text"
                  placeholder="Ruta"
                  value={incomeForm.route}
                  onChange={(e) =>
                    setIncomeForm({
                      ...incomeForm,
                      route: e.target.value,
                    })
                  }
                  className="w-full border rounded-2xl p-4"
                />

                <input
                  type="number"
                  placeholder="Valor"
                  value={incomeForm.value}
                  onChange={(e) =>
                    setIncomeForm({
                      ...incomeForm,
                      value: e.target.value,
                    })
                  }
                  className="w-full border rounded-2xl p-4"
                />

                <input
                  type="date"
                  value={incomeForm.date}
                  onChange={(e) =>
                    setIncomeForm({
                      ...incomeForm,
                      date: e.target.value,
                    })
                  }
                  className="w-full border rounded-2xl p-4"
                />

                <button
                  onClick={addIncome}
                  className="w-full bg-black text-white py-4 rounded-2xl font-bold"
                >
                  Guardar Ingreso
                </button>

              </div>

            </div>

            <div className="bg-white rounded-3xl p-6 shadow-xl">

              <h2 className="text-3xl font-bold mb-6">
                Historial de Ingresos
              </h2>

              <div className="space-y-4">

                {income.map((item) => (

                  <div
                    key={item.id}
                    className="border rounded-2xl p-4"
                  >

                    <div className="flex justify-between">

                      <div>

                        <h3 className="font-bold">
                          {item.client}
                        </h3>

                        <p>{item.route}</p>

                        <p>{item.date}</p>

                      </div>

                      <div className="text-right">

                        <p className="font-bold text-green-600">
                          ${Number(item.value).toLocaleString()}
                        </p>

                        <button
                          onClick={() => deleteIncome(item.id)}
                          className="bg-red-500 text-white px-3 py-2 rounded-xl mt-2"
                        >
                          Eliminar
                        </button>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        )}

        {/* GASTOS */}

        {activeTab === "expenses" && (

          <div className="grid lg:grid-cols-2 gap-6">

            <div className="bg-white rounded-3xl p-6 shadow-xl">

              <h2 className="text-3xl font-bold mb-6">
                Registrar Gasto
              </h2>

              <div className="space-y-4">

                <input
                  type="text"
                  placeholder="Tipo"
                  value={expenseForm.type}
                  onChange={(e) =>
                    setExpenseForm({
                      ...expenseForm,
                      type: e.target.value,
                    })
                  }
                  className="w-full border rounded-2xl p-4"
                />

                <input
                  type="text"
                  placeholder="Descripción"
                  value={expenseForm.description}
                  onChange={(e) =>
                    setExpenseForm({
                      ...expenseForm,
                      description: e.target.value,
                    })
                  }
                  className="w-full border rounded-2xl p-4"
                />

                <input
                  type="number"
                  placeholder="Valor"
                  value={expenseForm.value}
                  onChange={(e) =>
                    setExpenseForm({
                      ...expenseForm,
                      value: e.target.value,
                    })
                  }
                  className="w-full border rounded-2xl p-4"
                />

                <input
                  type="date"
                  value={expenseForm.date}
                  onChange={(e) =>
                    setExpenseForm({
                      ...expenseForm,
                      date: e.target.value,
                    })
                  }
                  className="w-full border rounded-2xl p-4"
                />

                <button
                  onClick={addExpense}
                  className="w-full bg-black text-white py-4 rounded-2xl font-bold"
                >
                  Guardar Gasto
                </button>

              </div>

            </div>

            <div className="bg-white rounded-3xl p-6 shadow-xl">

              <h2 className="text-3xl font-bold mb-6">
                Historial de Gastos
              </h2>

              <div className="space-y-4">

                {expenses.map((item) => (

                  <div
                    key={item.id}
                    className="border rounded-2xl p-4"
                  >

                    <div className="flex justify-between">

                      <div>

                        <h3 className="font-bold">
                          {item.type}
                        </h3>

                        <p>{item.description}</p>

                        <p>{item.date}</p>

                      </div>

                      <div className="text-right">

                        <p className="font-bold text-red-600">
                          ${Number(item.value).toLocaleString()}
                        </p>

                        <button
                          onClick={() => deleteExpense(item.id)}
                          className="bg-red-500 text-white px-3 py-2 rounded-xl mt-2"
                        >
                          Eliminar
                        </button>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );

}
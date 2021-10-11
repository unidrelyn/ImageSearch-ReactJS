import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import ListadoImagenes from "./components/ListadoImagenes";

function App() {
	const [busqueda, setBusqueda] = useState("");
	const [imagenes, setImagenes] = useState([]);
	const [paginaActual, setPaginaActual] = useState(1);
	const [totalPaginas, setTotalPaginas] = useState(1);

	useEffect(() => {
		const consultarApi = async () => {
			if (busqueda === "") {
				return;
			}
			const imagenesporpagina = 30;
			const key = "23586139-2976c30a3c29bbd2026c056e6";
			const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesporpagina}&page=${paginaActual}`;

			const respuesta = await fetch(url);
			const resultado = await respuesta.json();
			setImagenes(resultado.hits);

			const calcularTotalPaginas = Math.ceil(
				resultado.totalHits / imagenesporpagina
			);
			setTotalPaginas(calcularTotalPaginas);

			const jumbotron = document.querySelector(".jumbotron");
			jumbotron.scrollIntoView({ behavior: "smooth" });
		};
		consultarApi();
	}, [busqueda, paginaActual]);

	const paginaAnterior = () => {
		const nuevaPaginaActual = paginaActual - 1;

		if (nuevaPaginaActual === 0) return;

		setPaginaActual(nuevaPaginaActual);
	};

	const paginaSiguiente = () => {
		const nuevaPaginaActual = paginaActual + 1;

		if (nuevaPaginaActual > totalPaginas) return;

		setPaginaActual(nuevaPaginaActual);
	};

	return (
		<div className="container">
			<div className="jumbotron">
				<p className="lead text-center">Buscador de Imagenes</p>
				<Formulario setBusqueda={setBusqueda} />
			</div>
			<div className="row justify-content-center">
				<ListadoImagenes imagenes={imagenes} />

				{paginaActual === 1 ? null : (
					<button
						type="button"
						className="bbtn btn-info mr-1"
						onClick={paginaAnterior}
					>
						&laquo; Anterior
					</button>
				)}
				{paginaActual === totalPaginas ? null : (
					<button
						type="button"
						className="bbtn btn-info mr-1"
						onClick={paginaSiguiente}
					>
						Siguiente &raquo;
					</button>
				)}
			</div>
		</div>
	);
}

export default App;

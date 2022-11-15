import React, { use } from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from '@supabase/supabase-js'

// get youtube thumbnail from video url
function getThumbnail(url) {
	return `https://img.youtube.com/vi/${url.split("v=")[1]}/0.jpg`;
}

// Custom Hook
function useForm(propsDoForm) {
	const [values, setValues] = React.useState(propsDoForm.initialValues);

	return {
		values,
		handleChange: (event) => {
			const value = event.target.value;
			const name = event.target.name
			setValues({
				...values,
				[name]: value,
			});
		},
		clearForm() {
			setValues({});
		}
	}
};

const PROJECT_URL = "https://jwmkxgdeyrrvxabtibix.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3bWt4Z2RleXJydnhhYnRpYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0Njc3NTUsImV4cCI6MTk4NDA0Mzc1NX0.zmaIDUj0U-uexJnCRe2AsYKzEhZNaH27oVJfHaD85xQ";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export default function RegisterVideo() {
	const formCadastro = useForm({
		initialValues: { titulo: "Frost punk", url: "https://www.youtube.com/watch?v=QsqatJxAUtk" }
	});
	const [formVisivel, setFormVisivel] = React.useState(false);

	return (
		<StyledRegisterVideo>
			<button className="add-video" onClick={() => setFormVisivel(true)}>+</button>
			{formVisivel
				? (
					<form onSubmit={(event) => {
						event.preventDefault();

						// Contrato entre o Front e o Backend
						supabase.from("video").insert({
							title: formCadastro.values.titulo,
							url: formCadastro.values.url,
							thumb: getThumbnail(formCadastro.values.url),
							playlist: "jogos",
						})
						.then((oqueveio) => {
							console.log(oqueveio)
						})
						.catch((error) => {
							console.log(error);
						})

						setFormVisivel(false);
						formCadastro.clearForm();
					}}>
						<div>
							<button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>X</button>
							<input
								placeholder="Título de vídeo"
								name="titulo"
								value={formCadastro.values.titulo}
								onChange={formCadastro.handleChange}
							/>
							<input
								placeholder="URL do vídeo"
								name="url"
								value={formCadastro.values.url}
								onChange={formCadastro.handleChange}
							/>
							<button type="submit">Cadastrar</button>
						</div>
					</form>
				)
				: false}
		</StyledRegisterVideo>
	)
}
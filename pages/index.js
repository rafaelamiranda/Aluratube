import React from "react";
import Link from "next/link";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";

function HomePage() {
	const [valorDoFiltro, setValorDoFiltro] = React.useState("");

	return (
		<>
			<div style={{
				display: "flex",
				flexDirection: "column",
				flex: 1,
				// backgroundColor: "red",
			}}>
				{/* Prop Drilling */}
				<Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
				<Header />
				<Timeline searchValue={valorDoFiltro} playlists={config.playlists}>
					Conteúdo
				</Timeline>
				<Aluratubes favorites={config.favorites} />
			</div>
		</>
	);
}

export default HomePage

const StyledHeader = styled.div`
    background-color: ${({ theme }) => theme.backgroundLevel1};
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;
const StyledBanner = styled.div`
	background-image: url(${({ bg }) => bg});
	background-size: cover;
	height: 230px;
`;
function Header() {
	return (
		<StyledHeader>
			<StyledBanner bg={config.banner} />
			<section className="user-info">
				<img src={`https://github.com/${config.github}.png`} />
				<div>
					<h2>
						{config.name}
					</h2>
					<p>
						{config.job}
					</p>
				</div>
			</section>
		</StyledHeader>
	)
}

function Timeline({ searchValue, ...propriedades }) {
	const playlistNames = Object.keys(propriedades.playlists);
	// Statement
	// Retorno por expressão
	return (
		<StyledTimeline>
			{playlistNames.map((playlistName) => {
				const videos = propriedades.playlists[playlistName];
				return (
					<section key={playlistName}>
						<h2>{playlistName}</h2>
						<div>
							{videos
								.filter((video) => {
									const titleNormalized = video.title.toLowerCase();
									const searchValueNormalized = searchValue.toLowerCase();
									return titleNormalized.includes(searchValueNormalized)
								})
								.map((video) => {
									return (
										<Link href={`/video/${video["url"].split("v=")[1]}?title=${video.title}`} key={video.url}>
											<img src={video.thumb} />
											<span>
												{video.title}
											</span>
										</Link>
									)
								})}
						</div>
					</section>
				)
			})}
		</StyledTimeline>
	)
}

const StyledAluratubes = styled.div`
	img {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		margin-bottom: 8px;
		font-size: 14px;
	}
	a {
		display: inline-grid;
		text-align: center;
		color: #000;
		margin: 0 8px;
	}
	section {
		padding: 0 32px;
	}
	h2 {
		font-size: 16px;
		margin-bottom: 16px;
	}
	span {
		color: ${({ theme }) => theme.textColorBase};
	}
`;

function Aluratubes(props) {
	const favoritesNames = Object.keys(props.favorites);

	return (
		<StyledAluratubes>
			{favoritesNames.map((favoritesName) => {
				const favorites = props.favorites[favoritesName];
				return [
					<section key={favoritesName} className="aluratubes-info">
						<h2>{favoritesName}</h2>
						<div>
							{favorites.map((favorite) => {
								return (
									<a key={favorite.github} href={`https://github.com/${favorite.github}`}>
										<img src={`https://github.com/${favorite.github}.png`} />
										<span>@{favorite.github}</span>
									</a>
								)
							})}
						</div>
					</section>
				]
			})}
		</StyledAluratubes>
	);
}
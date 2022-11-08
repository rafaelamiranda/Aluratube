import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";

function HomePage() {
	return (
		<>
			<CSSReset />
			<div style={{
				display: "flex",
				flexDirection: "column",
				flex: 1,
			}}>
				<Menu />
				<Header />
				<Timeline playlists={config.playlists} >
					Conteúdo
				</Timeline>
				<Aluratubes favorites={config.favorites} />
			</div>
		</>
	);
}

export default HomePage

const StyledHeader = styled.div`
	.banner-container {
		margin-top: 50px;
		width: 100%;
		height: auto;
	}
	.banner {
		width: 100%;
		height: 230px;
		object-fit: cover;
		object-position: center;
	}
	.avatar {
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
function Header() {
	return (
		<StyledHeader>
			<div className="banner-container">
				<img src={config.banner} className="banner"/>
			</div>
			<section className="user-info">
				<img src={`https://github.com/${config.github}.png`} className="avatar" />
				<div>
					<h2>{config.name}</h2>
					<p>{config.job}</p>
				</div>
			</section>
		</StyledHeader>
	);
}

function Timeline(props) {
	const playlistNames = Object.keys(props.playlists);
	// Statement
	// Retorno por expressão
	return (
		<StyledTimeline>
			{playlistNames.map((playlistName) => {
				const videos = props.playlists[playlistName];
				console.log(playlistName);
				console.log(videos);
				return [
					<section>
						<h2>{playlistName}</h2>
						<div>
							{videos.map((video) => {
								return (
									<a href={video.url}>
										<img src={video.thumb} />
										<span>{video.title}</span>
									</a>
								)
							})}
						</div>
					</section>
				]
			})}
		</StyledTimeline>
	);
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
`;

function Aluratubes(props) {
	const favoritesNames = Object.keys(props.favorites);

	return (
		<StyledAluratubes>
			{favoritesNames.map((favoritesName) => {
				const favorites = props.favorites[favoritesName];
				return [
					<section className="aluratubes-info">
						<h2>{favoritesName}</h2>
						<div>
							{favorites.map((favorite) => {
								return (
									<a href={`https://github.com/${favorite.github}`}>
										<img src={`https://github.com/${favorite.github}.png`}/>
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
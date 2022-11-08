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
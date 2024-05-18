import type { Config } from 'tailwindcss';

const config: Omit<Config, 'content'> = {
	theme: {
		extend: {
			colors: {
				dark: '#1b1b1b',
				gray: '#7D7D7D',
				light: '#f5f5f5',
				lightGray: '#ececec',
				codeBgLight: '#EAE9E5',
				codeBgDark: '#252525',
				red: '#a4253b',
				blue: '#053a86',
				darkBlue: '#030329',
				lightPurple: '#2C107D',
				lightBlue: '#1A065F',
				lightGreen: '#405016',
				primary: '#9d0208',
				primaryYellow: '#ffba08',
				yellow: '#cab539',
				emerald: '#116668',
				green: '#11342d',
				orange: '#e85d04',
				purple: '#61173c',
				plum: '#8c4659',
				slate: '#c2cbe2',

				// Additional common design system colors
				navy: '#001f3f',
				mint: '#98ff98',
				rose: '#ff007f',
				teal: '#008080',
				oxfordBlue: '#002147',
				sand: '#f4a460',
			},
		},
	},
	plugins: [],
};
export default config;

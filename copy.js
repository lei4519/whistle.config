const fs = require('fs-extra')

const dirs = [{
	src: './src/lib/uiServer/views',
	dest: './dist/lib/uiServer/views'
}]

dirs.forEach(({ src, dest }) => {
	fs.copy(src, dest)
})
module.exports = ({ env }) => ({
	'users-permissions': {
		config: {
			jwtSecret: env('JWT_SECRET'),
		},
	},
	upload: {
		config: {
			provider: './providers/neon-upload',
			providerOptions: {
				table: env('NEON_UPLOADS_TABLE', 'neon_uploads'),
				schema: env('NEON_UPLOADS_SCHEMA'),
				publicPath: env('NEON_UPLOADS_PUBLIC_PATH'),
			},
		},
	},
});

## To run locally
Please perform the 3 steps below.

### 1. API Contract
`$ npm i && npm run build`

### 2. Frontend
`$ npm i && npm start`

### 3. Backend
`$ npm i && npm run start-dev`

## Development
- Requires running 2 - 3 services, `frontend, backend, api-contract`
	- `api-contract/` contains all the types necessary to ensure information between backend and frontend are connected



## Structure
### Naming
- Folders
	
	Kebab convention e.g. `folder-name`

- Files

	- Upper case sensitive e.g. `FileName.ts` 
	- Except `index.ts` or `index`

### File structure
- Frontend
	```
		src/
			api/
			components/
			pages/
				css/
			store/
	```
	- `components/` are always shared within context
	- `pages/` the view of the app
	- `css/` it is best to cope the styles in separate folder to avoid messy structure
- Backend
	```
		src/
			controllers/
			logger/
			mocks/
			routes/
			services/
			utils/
	```
	- Each folder under `controllers/` must have the default `index.ts`

## MOCKS
- Users
	
	can be found at `backend/src/mocksUsers.ts`

- Login
	
	- Email starts **a{number}@a.com** e.g. `a5@a.com`, `a3@a.com`, `a7@a.com`
	- Password defaults to `test123`


## Note
Apologies, could have added tests but I'm running out of time. Anyway, I have taken a front-end challenge previously that contains tests for your reference: https://github.com/peterwateber/front-end-challenge

import { SQLite } from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

//save the image/move image+insert data to the db

/*export const saveImage= async(placename, country, image, latitude, longitude, description)=>{
	
		const fileName=image.split('/').pop();
		const newPath=FileSystem.documentDirectory + fileName;
		try {
			await FileSystem.moveAsync({
					from:image,
					to: newPath
				});
			const promise=new Promise((resolve,reject)=>{
			const dbResult= insertPlace(placename, country, image, latitude, longitude, description);
			resolve(dbResult);
			reject('error');
			})
			return promise;			
		} catch(err){
			throw err;
		}
}*/



//create database
const db= SQLite.openDatabase('places.db');
export const init=()=>{
	const promise=new Promise((resolve,reject)=>{
		db.transaction((trx)=>{
		trx.executeSql(
			'CREATE TABLE IF NOT EXISTS places (m_place_id INTEGER PRIMARY KEY NOT NULL, placename TEXT NOT NULL,image TEXT NOT NULL,country TEXT NOT NULL,latitude REAL NOT NULL,longitude REAL NOT NULL,description TEXT NOT NULL);',
			[],
			()=>{
				resolve();
			},
			(_,err)=>{
				reject(err);
			}
			)
		})
	})
	return promise;
}

export const insertPlace=(placename, country, image, latitude, longitude, description)=>{
	const promise=new Promise((resolve,reject)=>{
		db.transaction((trx)=>{
		trx.executeSql(
			`INSERT INTO places (placename, country, image, latitude, longitude, description) VALUES (?,?,?,?,?,?);`,
			[placename,country,image,latitude,longitude,description],
			(_,result)=>{
				resolve(result);
			},
			(_,err)=>{				
				reject(err);
			}
			)
		})
	})
	return promise;
}

export const fetchPlaces=()=>{
	const promise=new Promise((resolve,reject)=>{
		db.transaction((trx)=>{
		trx.executeSql(
			`SELECT * FROM places`,
			[],
			(_,result)=>{
				resolve(result);
			},
			(_,err)=>{				
				reject(err);
			}
			)
		})
	})
	return promise;
}

export const deletePlace=(id)=>{
	const promise=new Promise((resolve,reject)=>{
		db.transaction((trx)=>{
		trx.executeSql(
			`DELETE FROM places WHERE m_place_id=${id} ;`,
			[],
			(_,result)=>{
				resolve(result);
			},
			(_,err)=>{				
				reject(err);
			}
			)
		})
	})
	return promise;
}
export interface Rapport {
    idRapport?: number;
    description: string;
    dateRapport?: Date;
    idUser: number;
    idManager: number;
    idTerrain?: number;
    idEquipment?: number;
    terrainName?: string;
    equipmentName?: string;
    userName?: string;
}

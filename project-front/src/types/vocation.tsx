
export interface Vacation {
    vacation_id: number;
    destination: string;
    description: string;
    start_date: string;
    end_date: string;
    isFollowing: number;
    followers_count: number;
    image_file_name: string | File; 
    price: number;
}
import { useEffect, useState } from 'react';
import "./style.css";
import { IconX } from '@tabler/icons-react';
import CreatableSelect from 'react-select/creatable';
import Image from 'next/image';


type Anime = {
    id: number;
    title: {
        romaji: string;
    };
    coverImage: {
        medium: string;
    };
    genres: string[];
};

interface Collection {
    name: string;
    slug: string;
    animeIds: number[];
    animeDetails: Anime[];
}

export default function ModalAddCollection({setShowModal}: any) {
    const [collections, setCollections] = useState<Collection[]>([]);
    const [collectionSelected, setCollectionSelected] = useState("");
    const [alreadyExist, setAlreadyExist] = useState(false);

    useEffect(() => {
        const storedCollections = localStorage?.getItem('collections');
        if (storedCollections) {
            const dataCollection = JSON.parse(storedCollections);
            setCollections(dataCollection);
        }
    }, []);


    const slugify = (title: any) => {
        const slug = title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
        
        return slug;
    }

    const AddToCollection = () => {
        const updatedCollections = [...collections];
        if(collectionSelected == "") {
            return false;
        }

        const existingCollection = updatedCollections.find((collection) => collection.name === collectionSelected?.toLowerCase());

        if (existingCollection) {
            setAlreadyExist(true);
            return false;
        } else {
            setAlreadyExist(false);
            updatedCollections.push({
                name: collectionSelected?.toLowerCase(),
                slug: slugify(collectionSelected?.toLowerCase()),
                animeIds: [],
                animeDetails: []
            });
        }

        localStorage?.setItem('collections', JSON.stringify(updatedCollections));
        setCollections(updatedCollections);

        setShowModal(false)
    };

    return (
        <div className="modal-overlay">
            <div className="modal-wrapper">
                <div className="modal">
                    <div className="modal-header">
                        <span style={{float: "right", cursor: "pointer"}} onClick={() => setShowModal(false)}>
                            <IconX/>
                        </span>
                    </div>
                    <div className="modal-body">
                        <p style={{marginBottom: "6rem", width: "100%"}}>
                            <p style={{marginBottom: "0.5rem", float: "left"}}>Collection Name :</p>
                            <input 
                                style={{
                                    border: "1px solid rgba(49, 54, 68, 0.25)",
                                    fontSize: "1.25rem",
                                    borderRadius: "4px",
                                    padding: "2%",
                                    width: "96%", 
                                    float: "left"
                                }}
                                type='text'
                                onKeyUp={(e: any) => {
                                    console.log("Event Press :", e?.currentTarget?.value);
                                    setCollectionSelected(e?.currentTarget?.value);
                                }}
                            />

                            {collectionSelected == "" && (  
                                <>
                                    <span style={{color: "#F00", fontSize: "12px", float: "left"}}>Input new collection name</span><br/>
                                </>
                            )}
                            
                            {alreadyExist == true && (
                                <>
                                    <span style={{color: "#F00", fontSize: "14px", float: "left"}}>Collection name already exist</span><br/>
                                </>
                            )}
                        </p>

                        <center>
                            <button
                                style={{
                                    padding: "0.5rem",
                                    backgroundColor: "rgb(123,213,85)",
                                    color: "#000",
                                    fontSize: "1rem",
                                    borderRadius: "4px",
                                    marginTop: "1.5rem",
                                    border: "1px solid rgba(49,54,68,.25)",
                                    cursor: "pointer"
                                }}
                                onClick={() => AddToCollection()}
                            >
                                Add collection
                            </button>  
                        </center>
                    </div>
                </div>
            </div>
        </div>
    );
}

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

export default function ModalAddToCollection({setShowModal, anime, setSuccessStatus}: any) {
    const [collections, setCollections] = useState<Collection[]>([]);
    const [collectionSelected, setCollectionSelected] = useState("");
    const [alreadyExist, setAlreadyExist] = useState(false);
    const [allCollections, setAllCollections] = useState<any>([]);

    useEffect(() => {
        const storedCollections = localStorage?.getItem('collections');
        if (storedCollections) {
            const dataCollection = JSON.parse(storedCollections);
            setCollections(dataCollection);

            const list:any = [];
            dataCollection?.map((item: any) => {
                list?.push({value: item?.name, label: item?.name?.toUpperCase()})
            });
            setAllCollections(list);
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

        const animeDetails = {
            id: anime?.id,
            title: {
                romaji: anime?.title?.romaji,
            },
            coverImage: {
                medium: anime?.coverImage?.medium,
            },
            genres: anime?.genres,
        }

        if (existingCollection) {
            if(existingCollection?.animeIds?.includes(anime?.id) == true) {
                setAlreadyExist(true);
                return false;
            }else{
                setAlreadyExist(false);
                existingCollection?.animeIds?.push(anime?.id);
                existingCollection?.animeDetails?.push(animeDetails);
            }
        } else {
            updatedCollections.push({
                name: collectionSelected?.toLowerCase(),
                slug: slugify(collectionSelected?.toLowerCase()),
                animeIds: [anime?.id],
                animeDetails: [animeDetails]
            });
        }

        localStorage?.setItem('collections', JSON.stringify(updatedCollections));
        setCollections(updatedCollections);
        setShowModal(false);
        setSuccessStatus(true);
    };

    useEffect(() => {
        const list:any = [];
        collections?.map((item: any) => {
            list?.push({value: item?.name, label: item?.name?.toUpperCase()})
        })

        setAllCollections(list);
    }, [collections])

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
                        <p style={{marginBottom: "0.5rem"}}>
                            <Image src={anime?.coverImage?.medium} alt="" width={65} height={80} style={{float: 'left', borderRadius: "4px"}} />
                            
                            <div style={{paddingLeft: "5rem"}}>
                                {anime?.title?.romaji}
                                <br/>
                                {
                                    anime?.genres?.map((genre: string, index: number) => {
                                        return (
                                            <button
                                                key={index}
                                                style={{
                                                padding: "0.25rem 0.5rem",
                                                backgroundColor: "rgb(123,213,85)",
                                                color: "#000",
                                                fontSize: "0.75rem",
                                                borderRadius: "1rem",
                                                float: "left",
                                                marginTop: "0.3rem",
                                                marginRight: "0.5rem",
                                                border: "1px solid rgb(123,213,85)"
                                                }}
                                            >
                                                {genre}
                                            </button>
                                        )
                                    })
                                }
                                
                                <br/><br/><br/>
                                <div style={{float: "left", width: "100%"}}>
                                    <p style={{marginBottom: "0rem", float: "left"}}>Collection Name :</p>
                                    <br/><br/>
                                    <CreatableSelect
                                        isClearable 
                                        options={
                                            allCollections ?
                                                allCollections?.length > 0 ?
                                                    allCollections
                                                : []
                                            : []
                                        } 
                                        onChange={(e: any) => {
                                            setCollectionSelected(e?.value)
                                            setAlreadyExist(false);
                                        }}
                                    />
                                    {collectionSelected == "" && (
                                        <span style={{color: "#F00", fontSize: "12px", float: "left"}}>Select collection name</span>
                                    )}
                                    
                                    {alreadyExist == true && (
                                        <span style={{color: "#F00", fontSize: "14px", float: "left"}}>Anime already exist on this collection, please select another collection name</span>
                                    )}
                                </div>
                            </div>
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
                                Save to collection
                            </button>  
                        </center>
                    </div>
                </div>
            </div>
        </div>
    );
}

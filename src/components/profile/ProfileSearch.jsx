import { useState } from "react";
import { Input } from "react-daisyui";
import { useGetApi } from "../../hooks/useGetApi";
import { PROFILES_URL } from "../constants/api";
import { Link } from 'react-router-dom';

function ProfileSearch() {
  const [searchValue, setSearchValue] = useState("");
  const { data: profiles } = useGetApi(`${PROFILES_URL}/search?q=${searchValue}`);

  const filteredProfiles = profiles?.filter((profile) => profile.title.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <div className="relative w-80 py-4 md:p-4 font-sans">
      <Input placeholder="Search" className="w-full" value={searchValue} onChange={(event) => setSearchValue(event.target.value.trim())} />
      {filteredProfiles && filteredProfiles.length > 0 && searchValue.length > 0 && (
        <ul className="absolute z-30 bg-teal-100 left-5 right-5">
          {filteredProfiles.map((profile) => (
            <li key={profile.name} className="cursor-pointer p-2">
              <Link to={`/profiles/${profile.name}`} className="block p-4 hover:bg-middle-green hover:font-semibold">{profile.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProfileSearch;

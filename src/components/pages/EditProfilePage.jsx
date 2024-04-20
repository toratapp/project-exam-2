import FirstHeading from "../common/FirstHeading";
import EditProfileForm from "../editProfile/EditProfileForm";

function EditProfile() {
  return (
    <section className="p-7 flex flex-col max-w-screen-2xl mx-auto mb-20 mt-16">
      <FirstHeading>Edit profile</FirstHeading>
      <EditProfileForm />
    </section>
  );
}

export default EditProfile;

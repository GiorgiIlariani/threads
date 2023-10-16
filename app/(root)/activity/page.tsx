import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

async function Page() {
  const user = await currentUser();

  if (!user) return null;

  // Getting user info through params
  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  // Get user activity
  const activity = await getActivity(userInfo._id);

  return (
    <section className="p-6">
      <h1 className="text-3xl font-semibold mb-8">Your Activity</h1>

      <div className="space-y-4">
        {activity.length > 0 ? (
          <>
            {activity.map((activityItem) => (
              <Link
                key={activityItem._id}
                href={`/thread/${activityItem.parentId}`}>
                <article className="p-4 border rounded-lg cursor-pointer flex items-center bg-transparent">
                  <Image
                    src={activityItem.author.image}
                    alt="profile picture"
                    width={40}
                    height={40}
                    className="rounded-full object-cover mr-4"
                  />
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-medium text-primary-500">
                      {activityItem.author.name}
                    </p>
                    <p className="text-light-1">replied to your thread</p>
                  </div>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="text-gray-500 text-lg">No activity yet</p>
        )}
      </div>
    </section>
  );
}

export default Page;

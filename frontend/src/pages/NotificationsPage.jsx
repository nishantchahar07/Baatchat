import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFriendRequests, acceptFriendRequest, rejectFriendRequest } from "../lib/api";
import { Check, X } from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationFound";

const NotificationPage = () => {
  const queryClient = useQueryClient();

  const { data: requests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const acceptMutation = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["userFriends"] });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: rejectFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
    },
  });

  const handleAccept = (requestId) => {
    acceptMutation.mutate(requestId);
  };

  const handleReject = (requestId) => {
    rejectMutation.mutate(requestId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Notifications</h1>
        <p className="text-base-content opacity-70">
          Manage your friend requests and stay updated.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card bg-base-200 p-4 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="avatar size-12 bg-base-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-base-300 rounded w-32 mb-2"></div>
                  <div className="h-3 bg-base-300 rounded w-24"></div>
                </div>
                <div className="h-8 bg-base-300 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      ) : requests?.length > 0 ? (
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request._id} className="card bg-base-200">
              <div className="card-body p-4">
                <div className="flex items-center gap-3">
                  <div className="avatar size-12">
                    <img src={request.sender.profilePic} alt={request.sender.fullName} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{request.sender.fullName}</h3>
                    <p className="text-sm opacity-70">
                      Wants to connect with you
                    </p>
                    <div className="flex gap-2 mt-2">
                      <span className="badge badge-secondary text-xs">
                        Native: {request.sender.nativeLanguage}
                      </span>
                      <span className="badge badge-outline text-xs">
                        Learning: {request.sender.learningLanguage}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAccept(request._id)}
                      disabled={acceptMutation.isPending}
                      className="btn btn-success btn-sm"
                    >
                      {acceptMutation.isPending ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        <>
                          <Check className="size-4" />
                          Accept
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleReject(request._id)}
                      disabled={rejectMutation.isPending}
                      className="btn btn-error btn-sm"
                    >
                      {rejectMutation.isPending ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        <>
                          <X className="size-4" />
                          Reject
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoNotificationsFound />
      )}
    </div>
  );
};

export default NotificationPage;

import {
  heading,
  loader,
  query,
  vstack,
  hstack,
  spacer,
  image,
  text,
  primaryButton,
} from "melony";
import { getCurrentScenarioSession } from "@/lib/actions/scenarios";

export const activitiesList = () => {
  return query({
    action: getCurrentScenarioSession,
    render: (query) => {
      if (query.isPending) {
        return loader();
      }

      return vstack({
        className: "w-full space-y-8",
        children: query?.data?.detail?.scenario?.activities?.map(
          (weekActivity: any) => {
            return vstack({
              className: "w-full space-y-4",
              children: [
                heading({ title: `Week ${weekActivity.week}` }),
                ...weekActivity.activities.map((activity: any) => {
                  return hstack({
                    className: "w-full space-x-4 border rounded-md",
                    children: [
                      image({
                        src:
                          activity?.article?.main_image ||
                          activity?.test?.image,
                        alt: activity?.article?.title || activity?.test?.title,
                        className: "w-40 h-40 rounded-md object-cover",
                      }),
                      vstack({
                        className: "py-4 items-start",
                        children: [
                          heading({
                            title:
                              activity?.article?.title || activity?.test?.title,
                          }),
                          text({ children: activity?.article?.read_time }),
                          spacer({ className: "mt-auto w-auto" }),
                          primaryButton({
                            label: "Start",
                            onClick: ({ openModal }) => {
                              openModal({
                                title: "Start Activity",
                                content: vstack({
                                  className: "p-8 gap-4 items-start",
                                  children: [
                                    text({
                                      children:
                                        "Are you sure you want to start this activity?",
                                    }),
                                    primaryButton({
                                      label: "Start",
                                      onClick: () => {
                                        console.log("Start");
                                      },
                                    }),
                                  ],
                                }),
                              });
                            },
                          }),
                        ],
                      }),
                    ],
                  });
                }),
              ],
            });
          }
        ),
      });
    },
  });
};

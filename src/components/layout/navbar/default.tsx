// Chakra Imports
import { Breadcrumb, Flex, Icon, SkeletonText, Tag, Text } from '@chakra-ui/react';
import { Fragment, ReactNode } from 'react';
import { useActiveSidebarItem } from '@/utils/router';
import { IoHome } from 'react-icons/io5';
import { FaChevronRight as ChevronRightIcon } from 'react-icons/fa';
import { common } from '@/config/translations/common';
import Link from 'next/link';

export function DefaultNavbar() {
  const activeItem = useActiveSidebarItem();
  const breadcrumb = [
    {
      icon: (<IoHome />) as ReactNode,
      text: (<common.T text="pages" />) as ReactNode,
      href: '/user/home',
    },
  ];

  if (activeItem != null)
    breadcrumb.push({
      icon: activeItem.icon,
      text: <>{activeItem.name}</>,
      href: activeItem.path,
    }); 

  const separator = (
    <Icon
      verticalAlign="middle"
      color="brand.500"
      _dark={{
        color: 'brand.100',
      }}
    >
      <ChevronRightIcon />
    </Icon>
  );

  return (
    <Flex
      direction="column"
      gap={{
        base: 2,
        sm: 3,
      }}
      mt={{
        base: '8px',
        sm: '0',
      }}
    >
      <Breadcrumb.Root
        fontSize="sm"
      >
        <Breadcrumb.List>
          {breadcrumb.map((item, i) => (
            <Fragment key={i}>
              {i > 0 && <Breadcrumb.Separator>{separator}</Breadcrumb.Separator>}
              <Breadcrumb.Item>
                <Tag.Root
                  asChild
                  gap={1}
                  rounded="full"
                  color="brand.500"
                  bg="brand.100"
                  _dark={{
                    color: 'brand.100',
                    bg: '#7551FF33',
                  }}
                >
                  <Link href={item.href}>
                    {item.icon}
                    <Tag.Label>{item.text}</Tag.Label>
                  </Link>
                </Tag.Root>
              </Breadcrumb.Item>
            </Fragment>
          ))}
        </Breadcrumb.List>
      </Breadcrumb.Root>
      <Text color="TextPrimary" fontWeight="bold" fontSize={{ base: '25px', sm: '34px' }} mb={2}>
        {activeItem?.name || <SkeletonText w="full" noOfLines={2} />}
      </Text>
    </Flex>
  );
}

import {
  Drawer,
  Flex,
  Spacer,
  CloseButton,
} from '@chakra-ui/react';
import { BottomCard, SidebarContent } from './SidebarContent';
import { AnimatePresence, motion } from 'framer-motion';
import { usePageStore } from '@/stores';
import { ReactNode } from 'react';

export function Sidebar({ sidebar }: { sidebar?: ReactNode }) {
  return (
    <Flex
      direction="column"
      display={{ base: 'none', xl: 'flex' }}
      flexShrink={0}
      bg="CardBackground"
      w="300px"
      h="100%"
      overflowX="hidden"
      overflowY="auto"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={sidebar == null ? 'default' : 'new'}
          initial={{ x: '100px', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-100px', opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          {sidebar ?? <SidebarContent />}
        </motion.div>
      </AnimatePresence>
      <Spacer />
      <BottomCard />
    </Flex>
  );
}

export function SidebarResponsive({ sidebar }: { sidebar?: ReactNode }) {
  const [isOpen, setOpen] = usePageStore((s) => [s.sidebarIsOpen, s.setSidebarIsOpen]);

  return (
    <Drawer.Root open={isOpen} onOpenChange={(details: { open: boolean }) => setOpen(details.open)}>
      <Drawer.Backdrop />
      {/* @ts-expect-error Chakra v3 types don't include children on compound components */}
      <Drawer.Positioner>
        {/* @ts-expect-error Chakra v3 types don't include children on compound components */}
        <Drawer.Content w="285px" maxW="285px" bg="CardBackground">
          {/* @ts-expect-error Chakra v3 types don't include children on compound components */}
          <Drawer.CloseTrigger asChild position="absolute" top={2} right={2}>
            <CloseButton size="sm" />
          </Drawer.CloseTrigger>
          <Drawer.Body maxW="285px" px="0rem" pb="0">
            <Flex direction="column" height="100%" overflow="auto">
              {sidebar ?? <SidebarContent />}
              <Spacer />
              <BottomCard />
            </Flex>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}
